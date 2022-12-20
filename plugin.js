// This file is currently necessary because the TypeScript language server requires the
// plugin to be a CommonJS module which exports a function as module.exports
// eslint-disable-next-line import/no-unresolved
module.exports = require("./dist/plugin.js").default;
