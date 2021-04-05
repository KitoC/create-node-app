module.exports = {
  imports: {
    javascript: `const winston = require("winston");
const get = require("lodash/get");
const config = require("../../_config");`,
    typescript: `import winston from "winston";
import get from "lodash/get";
import config from "../../_config";`,
  },
};
