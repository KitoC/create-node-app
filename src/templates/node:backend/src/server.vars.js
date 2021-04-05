module.exports = {
  imports: {
    javascript: `const express = require("express");
const config = require("../_config");
const Logger = require("./loaders/logger");
const loaders = require("./loaders");`,
    typescript: `import express from "express";
import config from "../_config";
import Logger from "./loaders/logger";
import loaders from "./loaders";`,
  },
};
