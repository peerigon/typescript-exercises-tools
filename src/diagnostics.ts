import ts from "./typescript";
import {pluginName} from "./const";

export const getExpectedDiagnostics = (sourceFile: ts.SourceFile) => {
    const sourceCode = sourceFile.getFullText();

    const annotations = sourceCode.matchAll(
        /(.*?\/\/ 💣? ?Expect error (\d+)(.*?)\r?\n\s*)([^\n\r]*)/g,
    );

    return Array.from(annotations, (annotation) => {
        const [, comment, code, expectedErrorMessage, nextLine] = annotation;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const start = annotation.index! + comment.length;

        const messageText = `Missing error ${code}` +
            (expectedErrorMessage === "" ? "" : `"${expectedErrorMessage}"`);

        return {
            file: sourceFile,
            category: ts.DiagnosticCategory.Error,
            start,
            length: nextLine.length,
            code: parseInt(code),
            source: pluginName,
            messageText,
        };
    });
};

const isInSameRange = (diagnosticA: ts.Diagnostic, diagnosticB: ts.Diagnostic) => {
    const startA = diagnosticA.start;
    const startB = diagnosticB.start;
    const lengthA = diagnosticA.length;
    const lengthB = diagnosticB.length;

    if (
        startA === undefined ||
        lengthA === undefined ||
        startB === undefined ||
        lengthB === undefined
    ) {
        return false;
    }

    const endA = startA + lengthA;
    const endB = startB + lengthB;

    return (startA >= startB && endA <= endB) || (startB >= startA && endB <= endA);
};

export const matchesDiagnostic = (diagnosticA: ts.Diagnostic) => {
    return (diagnosticB: ts.Diagnostic) => {
        return (
            diagnosticA.file !== undefined &&
            diagnosticB.file !== undefined &&
            diagnosticA.file.fileName === diagnosticB.file.fileName &&
            isInSameRange(diagnosticA, diagnosticB) &&
            diagnosticA.code === diagnosticB.code
        );
    };
};

export const getUnexpectedDiagnostics = (
    actualDiagnostics: Array<ts.Diagnostic>,
    expectedDiagnostics: Array<ts.Diagnostic>,
) => {
    const unexpectedDiagnostics = actualDiagnostics.filter(
        (actualDiagnostic) =>
            expectedDiagnostics.some(matchesDiagnostic(actualDiagnostic)) === false,
    );

    return unexpectedDiagnostics;
};

export const getMissingExpectedDiagnostics = (
    actualDiagnostics: Array<ts.Diagnostic>,
    expectedDiagnostics: Array<ts.Diagnostic>,
) => {
    const missingExpectedDiagnostics = expectedDiagnostics.filter(
        (expectedDiagnostic) =>
            actualDiagnostics.some(matchesDiagnostic(expectedDiagnostic)) === false,
    );

    return missingExpectedDiagnostics;
};

export const lowerSeverityOfExpectedDiagnostics = (
    actualDiagnostics: Array<ts.Diagnostic>,
    expectedDiagnostics: Array<ts.Diagnostic>,
) => {
    return expectedDiagnostics.map((expectedDiagnostic) => {
        const actualDiagnostic = actualDiagnostics.find(matchesDiagnostic(expectedDiagnostic));

        return actualDiagnostic === undefined ?
            null :
            {
                ...actualDiagnostic,
                category: ts.DiagnosticCategory.Suggestion,
            };
    }).filter((diagnostic): diagnostic is ts.Diagnostic => diagnostic !== null);
};
