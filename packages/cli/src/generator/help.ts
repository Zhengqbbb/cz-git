/** `czg` help document */
import { style } from "cz-git";
export const generateHelp = (version: string, code = 0) => {
  // prettier-ignore
  console.log(
    `${style.yellow("NAME:")} 
    ${style.green("czg")} - Interactive Commitizen CLI that generate standardized commit messages

${style.yellow("WEBSITE:")}
    ${style.underline("https://cz-git.qbenben.com/cli/")}
    ${style.underline("https://github.com/Zhengqbbb/cz-git")}

${style.yellow("VERSION:")} ${version}

${style.yellow("SYNOPSIS:")}
    czg [subcommand] [options]

${style.yellow("SUBCOMMAND:")}
    ${style.cyan("init")}           ${style.red("Generate initialize commitizen configFile and guide")}
                   ${style.gray("Default porvide interactive prompt. skip 'czg init -y'")}
    ${style.cyan("emoji")}          ${style.red("Turn on emoji mode")}
    ${style.cyan("checkbox")}       ${style.red("Turn on scope checkbox mode")}
    ${style.cyan("version")}        ${style.red("Show version")}
    ${style.cyan("help")}           ${style.red("Show help")}

${style.yellow("OPTIONS:")}
    ${style.cyan("--config")}       ${style.red("Specify the configuration file to use")}
    ${style.cyan("--reback|-b")}    ${style.red("Provide interactive prompt by the last message")}
    ${style.cyan("--retry|-r")}     ${style.red("Direct retry submit by the last message")}

${style.yellow("EXAMPLES:")}
    ${style.cyan("czg")}
    ${style.cyan("czg emoji")}
    ${style.cyan("czg --config \"./config/cz.json\"")}

Run 'czg SUBCOMMAND --help' for more information on a command
Extends 'git commit' command and options. 
See 'git commit --help' for more information. `
  );
  process.exit(code);
};
