module.exports = {
  imports: {
    javascript: `const fs = require("fs");
const path = require("path");
const get = require("lodash/get");
const startCase = require("lodash/startCase");
const { Sequelize } = require("sequelize");`,
    typescript: `import fs from "fs";
import path from "path";
import get from "lodash/get";
import startCase from "lodash/startCase";
import { Sequelize } from "sequelize";
import { LoaderArgs } from "../@types/loader.types";
import { Db, GetModelByKeyFunction, AddModelToDbFunction } from "../@types/db.types";`,
  },
  addModelToDb: {
    typescript: `: AddModelToDbFunction = async (file) => {
    const model = require(path.join(modelDir, file)).default(sequelize);

    db = { ...db, [startCase(model.name).replace(" ", "")]: model };
  };`,
    javascript: ` = (file) => {
    const model = require(\`./\${file}\`)(sequelize);

    db = { ...db, [startCase(model.name)]: model };
  }`,
  },
  loaderArgs: {
    typescript: ": LoaderArgs",
  },
  db: {
    typescript: " as Db",
  },
  getModelByKey: {
    typescript: ": GetModelByKeyFunction",
  },
};
