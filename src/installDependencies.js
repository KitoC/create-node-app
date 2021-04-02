const shell = require("shelljs");

const createFolderStructure = (config) => {
  const { appName, database } = config;

  const dependencies = {
    required: {
      dep: [
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
      dev: ["nodemon"],
    },
  };
  // const {}

  shell.exec(`cd ${appName} && npm i ${dependencies.required.dep.join(" ")}`);
  shell.exec(
    `cd ${appName} && npm i -D ${dependencies.required.dev.join(" ")}`
  );
};

module.exports = createFolderStructure;
