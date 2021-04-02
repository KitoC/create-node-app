const express = require("express");
const config = require("../_config");
const Logger = require("./loaders/logger");

const startServer = async () => {
  const app = express();

  await require("./loaders")({ app, config });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
};

startServer();
