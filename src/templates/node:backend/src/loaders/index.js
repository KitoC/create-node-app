%%imports%%

%%export%% async ({ app, config }%%loaderArgs%%) => {
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
