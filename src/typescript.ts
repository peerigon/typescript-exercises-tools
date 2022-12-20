// This module is necessary because linting got really slow once we imported
// the typescript module directly. This way it can be ignored during `npm run test:lint`
import ts from "typescript";
import tsserverlibrary from "typescript/lib/tsserverlibrary.js";

export { tsserverlibrary };

export default ts;
