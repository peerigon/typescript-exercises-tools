// This file is currently necessary because the TypeScript language server requires the
// plugin to be a CommonJS module which exports a function as module.exports
// Just pointing to "./dist/plugin.js" is not enough because the compiled module exports
// an object like this { default: init } that get's refused by the language server
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require("./plugin.js").default;