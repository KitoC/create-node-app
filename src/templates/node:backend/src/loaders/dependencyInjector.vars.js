module.exports = {
  imports: {
    javascript: `const awilix = require("awilix");`,
    typescript: `import * as awilix from "awilix";
import { LoaderArgs } from "../@types/loader.types";`,
  },
  loaderArgs: {
    typescript: ": LoaderArgs",
  },
};
