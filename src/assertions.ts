import ts from "./typescript";
import {
    getExpectedDiagnostics,
    getUnexpectedDiagnostics,
    getMissingExpectedDiagnostics,
} from "./diagnostics";

const findCompilerOptionsFor = (programPath: string) => {
    const parseConfigHost: ts.ParseConfigHost = {
        fileExists: ts.sys.fileExists.bind(ts.sys),
        readFile: ts.sys.readFile.bind(ts.sys),
        readDirectory: ts.sys.readDirectory.bind(ts.sys),
        useCaseSensitiveFileNames: true,
    };

    const configFileName = ts.findConfigFile(
        programPath,
        ts.sys.fileExists.bind(ts.sys),
        "tsconfig.json",
    );

    if (configFileName === undefined) {
        throw new Error(`Cannot find tsconfig.json for "${programPath}"`);
    }

    const configFile = ts.readConfigFile(configFileName, ts.sys.readFile.bind(ts.sys));

    const {options: compilerOptions} = ts.parseJsonConfigFileContent(
        configFile.config,
        parseConfigHost,
        programPath,
    );

    return compilerOptions;
};

export const assertProgramToOnlyHaveExpectedErrors = (
    programPath: string,
    compilerOptions = findCompilerOptionsFor(programPath),
) => {
    const program = ts.createProgram([programPath], compilerOptions);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const sourceFile = program.getSourceFile(programPath)!;
    const actualDiagnostics = Array.from(ts.getPreEmitDiagnostics(program, sourceFile));
    const expectedDiagnostics = getExpectedDiagnostics(sourceFile);
    const unexpectedDiagnostics = getUnexpectedDiagnostics(actualDiagnostics, expectedDiagnostics);

    const missingExpectedDiagnostics = getMissingExpectedDiagnostics(
        actualDiagnostics,
        expectedDiagnostics,
    );

    if (unexpectedDiagnostics.length > 0) {
        throw new Error(unexpectedDiagnostics[0].messageText.toString());
    }
    if (missingExpectedDiagnostics.length > 0) {
        throw new Error(missingExpectedDiagnostics[0].messageText.toString());
    }
};
