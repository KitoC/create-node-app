module.exports = {
  defaultExportArgs: {
    javascript: "{ app, config }",
    typescript: "{ app, config }",
  },
  imports: {
    javascript: `const expressLoader = require("./express");
const dbLoader = require("./db");
const dependencyInjectorLoader = require("./dependencyInjector");
const Logger = require("./logger");

require("./events");
`,
    typescript: `import expressLoader from "./express";
import dbLoader from "./db";
import dependencyInjectorLoader from "./dependencyInjector";
import Logger from "./logger");

import  "./events";`,
  },
};
