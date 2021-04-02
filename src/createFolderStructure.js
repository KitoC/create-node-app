const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

const readFileAndReplaceContentVariables = ({ targetDir, variables = {} }) => {
  let contents = fs.readFileSync(targetDir, "utf8");

  Object.entries(variables).forEach(([key, value]) => {
    contents = contents.replace(new RegExp(`%%${key}%%`, "g"), value);
  });

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
};

const createFolderStructure = async (config) => {
  const { appName, repository = "", author = "" } = config;

  console.log("Building directories");
  const configTemplateDir = path.join(__dirname, "templates", "configs");
  const appDir = appName;

  shell.exec(`rm -rf ${appName}`);
  shell.exec(`cp -r  ${__dirname}/templates/js ${appName}`);
  shell.exec(`cp -r  ${__dirname}/templates/configs/always ${appName}`);

  replaceVariablesRecusrive({
    targetDir: appDir,
    variables: {
      appName,
      repository,
      author,
    },
  });
};

module.exports = createFolderStructure;
