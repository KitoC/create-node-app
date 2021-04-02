const expressLoader = require("./express");
const dbLoader = require("./db");
const dependencyInjectorLoader = require("./dependencyInjector");
const Logger = require("./logger");

require("./events");

module.exports = async ({ app, config }) => {
  const db = await dbLoader({ app, config });

  Logger.info("✌️ DB loaded and connected!");

  await dependencyInjectorLoader({
    app,
    config,
    registerModules: ({ asValue }) => ({ db: asValue(db) }),
  });

  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app });

  Logger.info("✌️ Express loaded");
};
