module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    // Removes the .js extension in imports
    // Based on recommendation in https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
