const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

const readFileAndReplaceContentVariables = ({ targetDir, variables = {} }) => {
  let contents = fs.readFileSync(targetDir, "utf8");

  Object.entries(variables).forEach(([key, value]) => {
    contents = contents.replace(new RegExp(`%%${key}%%`, "g"), value);
  });

  // contents = contents.replace(new RegExp("%%appName%%", "g"), appName);
  // contents = contents.replace(new RegExp("%%repository%%", "g"), repository);
  // contents = contents.replace(new RegExp("%%author%%", "g"), author);

  fs.writeFileSync(targetDir, contents, "utf8");
};

const replaceVariablesRecusrive = ({ targetDir, variables }) => {
  fs.readdirSync(targetDir, "utf8").forEach((file) => {
    const nextTargetDir = path.join(targetDir, file);

    if (file.includes(".")) {
      readFileAndReplaceContentVariables({
        targetDir: nextTargetDir,
        variables,
      });
    } else {
      replaceVariablesRecusrive({ targetDir: nextTargetDir, variables });
    }
  });

  // fs.readFileSync(appDir, "utf8").forEach((file) => {
  //   console.log("readFileSync", file);
  // });
};

const createFolderStructure = async (config) => {
  const { appName, repository = "", author = "" } = config;

  console.log("Building directories");

  shell.exec(`rm -rf ${appName}`);
  shell.exec(`cp -r  ${__dirname}/templates/js ${appName}`);
  shell.exec(`cp -r  ${__dirname}/templates/configs ${appName}`);

  const configTemplateDir = path.join(__dirname, "templates", "configs");
  const appDir = appName;

  replaceVariablesRecusrive({
    targetDir: appDir,
    variables: {
      appName,
      repository,
      author,
    },
  });

  // const files = fs.readdirSync(configTemplateDir, "utf8").forEach((file) => {
  //   let contents = fs.readFileSync(path.join(configTemplateDir, file), "utf8");

  //   contents = contents.replace(new RegExp("%%appName%%", "g"), appName);
  //   contents = contents.replace(new RegExp("%%repository%%", "g"), repository);
  //   contents = contents.replace(new RegExp("%%author%%", "g"), author);

  //   fs.writeFileSync(path.join(appName, file), contents, "utf8");
  // });
};

module.exports = createFolderStructure;
