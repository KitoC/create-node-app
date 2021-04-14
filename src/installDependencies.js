const shell = require("shelljs");

const createFolderStructure = (config) => {
  const { appName, appType, database, language } = config;

  const isTypescript = language === "typescript";

  const sequelizeCli = isTypescript
    ? "sequelize-cli-typescript"
    : "sequelize-cli";

  const appDeps = {
    "node:backend": {
      default: [
        "express",
        "cors",
        "dotenv",
        "helmet",
        "winston",
        "lodash",
        "awilix",
        "sequelize",
        sequelizeCli,
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
    },
  };

  const requiredDeps = appDeps[appType];

  const exludeTypesList = [
    "dotenv",
    "helmet",
    "winston",
    "awilix",
    sequelizeCli,
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

  if (isTypescript) {
    shell.exec(`cd ${appName} && npm i -D ${typescriptDeps.dev.join(" ")}`);
  }
};

module.exports = createFolderStructure;
