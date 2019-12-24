// This module is necessary because linting got really slow once we imported
// the typescript module directly. That's why we also have to disable eslint here.
/* eslint-disable */

import ts from "typescript";
import tsserverlibrary from "typescript/lib/tsserverlibrary.js";

export {tsserverlibrary};

export default ts;
