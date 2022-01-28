// This file is currently necessary because the TypeScript language server requires the
// plugin to be a CommonJS module which exports a function as module.exports
// Just pointing to "./dist/plugin.js" is not enough because the compiled module exports
// an object like this { default: init } that get's refused by the language server

// Also remember that there are some restrictions on TS language server plugins which
// might result in the language server refusing to load the plugin.
// E.g. we can't use package sub exports, only package names are allowed as plugins
// See https://github.com/microsoft/TypeScript/issues/42688
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require("./plugin.js").default;