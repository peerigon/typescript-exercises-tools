import {assertProgramToOnlyHaveExpectedErrors} from "./assertions";
import {fixturePaths} from "./test/fixtures";

describe("assertProgramToOnlyHaveExpectedErrors()", () => {
    test("throws no error when the program has only expected errors", () => {
        assertProgramToOnlyHaveExpectedErrors(fixturePaths.ok);
    });

    test("throws an error when the comment is at a wrong place", () => {
        expect(() =>
            assertProgramToOnlyHaveExpectedErrors(fixturePaths.errorWrongPlace),
        ).toThrowErrorMatchingInlineSnapshot(
            "\"Argument of type '4' is not assignable to parameter of type 'string'.\"",
        );
    });

    test("locates the closest tsconfig.json to the given program", () => {
        // This should not throw because the tsconfig.json inside the fixtures directory
        // doesn't specify strict: true.
        assertProgramToOnlyHaveExpectedErrors(fixturePaths.errorInStrictMode);
    });

    test("allows to pass custom compilerOptions", () => {
        expect(() =>
            assertProgramToOnlyHaveExpectedErrors(fixturePaths.errorInStrictMode, {strict: true}),
        ).toThrowErrorMatchingInlineSnapshot(
            "\"Type 'null' is not assignable to type 'number'.\"",
        );
    });
});
