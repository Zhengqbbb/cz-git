import minimist from "minimist";
import type { ParsedArgs } from "minimist";
import type { CzgitParseArgs, CzgitSubCommandList, CzgitFlagList } from "../types";

const deleteItem = (target: string, list: string[]) =>
  list.splice(list.indexOf(target), ~list.indexOf(target) ? 1 : 0);

const resovleSubCmd = (arg: string, cmd: CzgitSubCommandList, target: CzgitParseArgs) => {
  if (arg !== cmd) return target;
  if (!target.czgitArgs.subCommand) {
    target.czgitArgs.subCommand = {};
  }

  target.czgitArgs.subCommand[cmd] = true;
  deleteItem(cmd, target.gitArgs);
  return target;
};

const resovleFlag = (
  argv: ParsedArgs,
  flag: string,
  aliasFlag: CzgitFlagList,
  target: CzgitParseArgs
) => {
  if (!argv[flag] && !argv[aliasFlag]) return target;
  if (!target.czgitArgs.flag) {
    target.czgitArgs.flag = {};
  }

  target.czgitArgs.flag[aliasFlag] = argv[aliasFlag];
  if (typeof argv[aliasFlag] === "boolean") {
    deleteItem("-" + flag, target.gitArgs);
    deleteItem("--" + aliasFlag, target.gitArgs);
  } else {
    const filterRex = new RegExp(`^--${aliasFlag}=(.*)$`, "gi");
    target.gitArgs = target.gitArgs.filter((value) => !filterRex.test(value));
  }
  return target;
};

/**
 * resovle process.argv by minimist
 * @param {ParsedArgs} argv
 * @return {CzgitParseArgs} czgit parsed args
 */
export const resovleArgs = (argv: string[]): CzgitParseArgs => {
  const parseArgv = minimist(argv, {
    boolean: true,
    alias: {
      v: "version",
      h: "help",
      b: "reback",
      r: "retry",
      y: "yes"
    }
  });
  let result: CzgitParseArgs = {
    czgitArgs: {
      flag: null,
      subCommand: null
    },
    gitArgs: argv
  };

  // resolve subcmd
  if (parseArgv._.length !== 0) {
    for (let i = 0; i < parseArgv._.length; i++) {
      result = resovleSubCmd(parseArgv._[i], "init", result);
      result = resovleSubCmd(parseArgv._[i], "emoji", result);
      result = resovleSubCmd(parseArgv._[i], "checkbox", result);
      result = resovleSubCmd(parseArgv._[i], "break", result);
    }
  }
  // resolve flag
  result = resovleFlag(parseArgv, "h", "help", result);
  result = resovleFlag(parseArgv, "b", "reback", result);
  result = resovleFlag(parseArgv, "r", "retry", result);
  result = resovleFlag(parseArgv, "y", "yes", result);
  result = resovleFlag(parseArgv, "version", "version", result);
  result = resovleFlag(parseArgv, "hook", "hook", result);
  result = resovleFlag(parseArgv, "config", "config", result);

  return result;
};

/**
 * provide environment variable to cz-git
 */
export const injectEnv = (key: string, target?: boolean) => {
  if (target) process.env[key] = "1";
};
