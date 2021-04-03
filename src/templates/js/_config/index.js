%%imports%%

require("dotenv").config();

%%export%% {
  port: process.env.PORT,
  appName: "%%appName%%",
  db,
};
