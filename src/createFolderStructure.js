const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

const readFileAndReplaceContentVariables = async ({
  targetDir,
  variables = {},
  language,
}) => {
  let fileDir = targetDir;
  let varsFile = fileDir.replace(".js", ".vars.js");
  let contents = fs.readFileSync(fileDir, "utf8");

  const hasVarsFile =
    fs.existsSync(varsFile, "utf8") && fileDir.includes(".js");

  if (hasVarsFile) {
    const vars = require(path.join(process.cwd(), varsFile));

    vars.export = {
      javascript: "module.exports =",
      typescript: "export default",
    };

    Object.entries(vars).forEach(([key, value]) => {
      contents = contents.replace(
        new RegExp(`%%${key}%%`, "g"),
        value[language]
      );
    });
  }

  Object.entries(variables).forEach(([key, value]) => {
    contents = contents.replace(new RegExp(`%%${key}%%`, "g"), value);
  });

  if (
    language === "typescript" &&
    (fileDir.includes("src") || fileDir.includes("_config"))
  ) {
    shell.exec(`rm ${fileDir}`);

    varsFile = varsFile.replace(".js", ".ts");

    fileDir = fileDir.replace(".js", ".ts");
  }

  await fs.writeFileSync(fileDir, contents, "utf8");

  if (hasVarsFile) {
    shell.exec(`rm ${varsFile}`);
  }
};

const replaceVariablesRecusrive = ({ targetDir, variables, language }) => {
  fs.readdirSync(targetDir, "utf8").forEach((file) => {
    const nextTargetDir = path.join(targetDir, file);

    console.log("Adding " + file);

    if (file.includes(".")) {
      readFileAndReplaceContentVariables({
        targetDir: nextTargetDir,
        variables,
        language,
      });
    } else {
      replaceVariablesRecusrive({
        targetDir: nextTargetDir,
        variables,
        language,
      });
    }
  });
};

const createFolderStructure = async (config) => {
  const { appName, appType, repository = "", author = "", language } = config;

  const configTemplateDir = path.join(__dirname, "templates", "configs");
  const appDir = appName;

  shell.exec(`rm -rf ${appName}`);
  shell.exec(`cp -r ${__dirname}/templates/configs/${language}/. ${appName}`);
  shell.exec(`cp -r ${__dirname}/templates/configs/always/. ${appName}`);
  shell.exec(`cp -r ${__dirname}/templates/${appType}/. ${appName}`);

  if (language !== "typescript") {
    shell.exec(`rm -rf ${appName}/src/@types`);
  }

  replaceVariablesRecusrive({
    targetDir: appDir,
    language,
    variables: {
      appName,
      repository,
      author,
    },
  });
};

module.exports = createFolderStructure;
