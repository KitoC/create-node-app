const shell = require("shelljs");

const createFolderStructure = (config) => {
  const { appName, database, language } = config;
  const requiredDeps = {
    default: [
      "express",
      "cors",
      "dotenv",
      "helmet",
      "winston",
      "lodash",
      "awilix",
      "sequelize",
      "sequelize-cli",
      database,
    ],
    dev: [
      "jest",
      "nodemon",
      "prettier",
      "eslint",
      "eslint-config-airbnb-base",
      "eslint-config-prettier",
      "eslint-plugin-import",
    ],
  };

  const exludeTypesList = [
    "dotenv",
    "helmet",
    "winston",
    "awilix",
    "sequelize-cli",
  ];
  const pkgTypes = requiredDeps.default
    .filter((pkg) => !exludeTypesList.includes(pkg))
    .map((pkg) => `@types/${pkg}`);

  const typescriptDeps = {
    dev: [
      "typescript",
      "ts-jest",
      "ts-node",
      "ts-node-dev",
      "@typescript-eslint/parser",
      "@typescript-eslint/eslint-plugin",
      ...pkgTypes,
    ],
  };

  shell.echo("Installing dependencies");

  shell.exec(`cd ${appName} && npm i ${requiredDeps.default.join(" ")}`);
  shell.exec(`cd ${appName} && npm i -D ${requiredDeps.dev.join(" ")}`);

  if (language === "typescript") {
    shell.exec(`cd ${appName} && npm i -D ${typescriptDeps.dev.join(" ")}`);
  }
};

module.exports = createFolderStructure;
