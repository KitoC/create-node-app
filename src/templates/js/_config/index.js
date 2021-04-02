require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  appName: "%%appName%%",
  db: {
    development: { use_env_variable: "DATABASE_URL" },
    test: { use_env_variable: "DATABASE_URL_TEST", logging: false },
    production: { use_env_variable: "DATABASE_URL" },
  },
};
