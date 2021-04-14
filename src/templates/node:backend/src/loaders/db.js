%%imports%%

%%export%% ({ app, config }%%loaderArgs%%) => {
  const env = process.env.NODE_ENV || "development";

  let db = {} %%db%%;
  const getModelByKey%%getModelByKey%% = (key) => get(db, key, {});

  const addModelToDb%%addModelToDb%%

  const _config = get(config, `db.${env}`, {});

  const sequelize = new Sequelize(
    process.env[_config.use_env_variable],
    _config
  );

  const modelDir = path.join(process.cwd(), "src", "db", "models");

  fs.readdirSync(modelDir).forEach(addModelToDb);


  Object.keys(db).forEach((modelName) => {
    if (getModelByKey(modelName).associate) {
      getModelByKey(modelName).associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
