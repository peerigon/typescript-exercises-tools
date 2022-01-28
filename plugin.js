// This file is currently necessary because the TypeScript language server requires the
// plugin to be a CommonJS module which exports a function as module.exports
// Just pointing to "./dist/plugin.js" is not enough because the compiled module
module.exports = require("./dist/plugin.js").default;
