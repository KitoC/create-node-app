#!/usr/bin/env node

const prompts = require("prompts");
const shell = require("shelljs");
const createFolderStructure = require("./createFolderStructure");
const installDependencies = require("./installDependencies");

const [appName, ...args] = process.argv.slice(2);
const createOption = (value) => ({ title: value, value });

const languageOptions = ["javascript", "typescript"].map(createOption);

const apiModeOptions = [
  {
    title: "rest (express)",
    value: "express",
  },
  {
    title: "graphql (apollo-js)",
    value: "apollo-js",
  },
];

const dbOptions = [
  {
    title: "postgres",
    value: "pg",
  },
];

const findFlag = ({ key, defaultValue, multi }) => {
  const value = args.find((arg) => arg.includes(key));

  if (!value) {
    return defaultValue;
  }

  if (multi) {
    return value.split(",");
  }

  return value;
};

(async () => {
  const config = {
    language: findFlag({ key: "--lang", defaultValue: "javascript" }),
    api_mode: findFlag({
      key: "--apiMode",
      defaultValue: ["express"],
      multi: true,
    }),
    database: findFlag({ key: "--db", defaultValue: "pg" }),
  };

  if (!args.includes("--skip")) {
    config = await prompts([
      {
        type: "select",
        name: "language",
        message: "Select typescript or javascript",
        choices: languageOptions,
        initial: 0,
      },
      {
        type: "multiselect",
        name: "api_mode",
        message: "select Api Mode",
        choices: apiModeOptions,
        initial: 0,
        min: 1,
      },
      {
        type: "select",
        name: "database",
        message: "Select database",
        choices: dbOptions,
        initial: 0,
      },
    ]);
  }

  config.appName = appName;

  console.log(config);

  shell.echo(`Creating new node-server ${appName}`);

  createFolderStructure(config);
  installDependencies(config);

  shell.exec(`cd ${appName} && git init`);
})();
