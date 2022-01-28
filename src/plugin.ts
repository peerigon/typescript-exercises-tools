import {
  getExpectedDiagnostics,
  getUnexpectedDiagnostics,
  getMissingExpectedDiagnostics,
  lowerSeverityOfExpectedDiagnostics,
} from "./diagnostics";

const init = () => {
  return {
    create: (info: ts.server.PluginCreateInfo) => {
      info.project.projectService.logger.info(
        "Started typescript-exercise-tools plugin!"
      );

      const proxy: ts.LanguageService = Object.create(null);

      Object.entries(info.languageService).forEach(([k, x]) => {
        proxy[k as keyof ts.LanguageService] = (...args: Array<any>) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          x.apply(info.languageService, args);
      });

      proxy.getSemanticDiagnostics = (...paths) => {
        const actualDiagnostics = info.languageService.getSemanticDiagnostics(
          ...paths
        );
        const program = info.languageService.getProgram();

        if (
          program === undefined ||
          paths.some((path) => program.getSourceFile(path) === undefined)
        ) {
          return actualDiagnostics;
        }

        const expectedDiagnostics = paths
          .map((path) => program.getSourceFile(path))
          .filter(
            (sourceFile): sourceFile is ts.SourceFile =>
              sourceFile !== undefined
          )
          .map((sourceFile) => getExpectedDiagnostics(sourceFile));

        // We need to do this separately because of a strange ESLint bug with .flat()
        const expectedDiagnosticsFlat = expectedDiagnostics.flat();

        const unexpectedDiagnostics = getUnexpectedDiagnostics(
          actualDiagnostics,
          expectedDiagnosticsFlat
        );

        const missingExpectedDiagnostics = getMissingExpectedDiagnostics(
          actualDiagnostics,
          expectedDiagnosticsFlat
        );

        const completeDiagnostics = unexpectedDiagnostics.concat(
          missingExpectedDiagnostics,
          lowerSeverityOfExpectedDiagnostics(
            actualDiagnostics,
            expectedDiagnosticsFlat
          )
        );

        return completeDiagnostics;
      };

      return proxy;
    },
  };
};

export default init;
