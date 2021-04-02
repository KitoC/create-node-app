require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  appName: "%%appName%%",
  db: require("./db"),
};
