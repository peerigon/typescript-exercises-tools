import {assertProgramToOnlyHaveExpectedErrors} from "./assertions";

describe("assertProgramToOnlyHaveExpectedErrors()", () => {
    test("It throws no error when the program has only expected errors", () => {
        assertProgramToOnlyHaveExpectedErrors(require.resolve("./test/fixtures/ok.ts"));
    });

    test("It throws an error when the comment is at a wrong place", () => {
        expect(() =>
            assertProgramToOnlyHaveExpectedErrors(
                require.resolve("./test/fixtures/error-wrong-place.ts"),
            ),
        ).toThrowErrorMatchingInlineSnapshot(
            "\"Argument of type '4' is not assignable to parameter of type 'string'.\"",
        );
    });
});
