%%export%% {
  development: { use_env_variable: "DATABASE_URL" },
  test: { use_env_variable: "DATABASE_URL_TEST", logging: false },
  production: { use_env_variable: "DATABASE_URL" },
};
