module.exports = {
  imports: {
    javascript: `const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("../api");
const get = require("lodash/get");`,
    typescript: `import express, { RequestHandler, ErrorRequestHandler } from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "../api";
import get from "lodash/get";
import { LoaderArgs } from "../@types/loader.types";
`,
  },
  loaderArgs: {
    typescript: ": LoaderArgs",
  },
  send200Status: {
    typescript: ": RequestHandler",
  },
  errorHandler: {
    typescript: ": ErrorRequestHandler",
  },
};
