module.exports = {
  imports: {
    javascript: `const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("../api");
const get = require("lodash/get");`,
    typescript: `import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "../api";
import get from "lodash/get";`,
  },
};
