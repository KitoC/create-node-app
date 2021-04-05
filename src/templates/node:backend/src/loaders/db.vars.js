module.exports = {
  imports: {
    javascript: `const fs = require("fs");
const path = require("path");
const get = require("lodash/get");
const { Sequelize } = require("sequelize");`,
    typescript: `import fs from "fs";
import path from "path";
import get from "lodash/get";
import { Sequelize } from "sequelize";
import { LoaderArgs } from "../@types/loader.types";
import { Db, GetModelByKeyFunction } from "../@types/db.types";`,
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
