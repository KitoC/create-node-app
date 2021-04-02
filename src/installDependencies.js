const shell = require("shelljs");

const createFolderStructure = (config) => {
  const { appName, database } = config;

  const dependencies = {
    required: {
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
      dev: ["nodemon"],
    },
    testSuite: {
      jest: ["jest"],
    },
  };

  const { required } = dependencies;

  shell.exec(`cd ${appName} && npm i ${required.default.join(" ")}`);
  shell.exec(`cd ${appName} && npm i -D ${required.dev.join(" ")}`);
};

module.exports = createFolderStructure;
