# About this folder

**You can use this folder to debug the language server plugin.**

Follow these steps:

1. Open VS Code in the package root folder (with the package.json)
2. Make sure that workspace version of TypeScript is used. This should already be the case (see `settings.json`)
3. Open one of the `.ts` files in this folder
4. Double-check the TypeScript version with `CMD + SHIFT + P` and then "Select TypeScript Version"
5. `CMD + SHIFT + P` + "Restart TS Server"
6. `CMD + SHIFT + P` + "Open TS Server log"

Make sure that the plugin is loaded correctly. The language server usually prints an info if there's something wrong with the plugin.
