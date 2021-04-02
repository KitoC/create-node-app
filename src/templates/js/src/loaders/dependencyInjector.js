const awilix = require("awilix");

module.exports = ({ app, registerModules = () => {} }) => {
  const container = awilix.createContainer();

  container.loadModules(["services/**/*.js"], {
    formatName: "camelCase",
    resolverOptions: { register: awilix.asFunction },
  });

  container.register(registerModules(awilix));

  app.use((req, res, next) => {
    res.locals.container = container;

    next();
  });
};
