import { CommitizenType, prompter, style } from "cz-git";
import inquirer from "inquirer";
import { commit } from "./commit";
import { isGitClean, getGitRootPath, injectEnv } from "../shared";
import type { CzgitParseArgs } from "../shared";

/**
 * start inquirer prompts to commit message
 */
export const czg = (version: string, argvs: CzgitParseArgs, environment: any = {}) => {
  const shouldStageAllFiles = argvs.gitArgs.includes("-a") || argvs.gitArgs.includes("--all");

  isGitClean(
    process.cwd(),
    (error, isClean) => {
      if (error) {
        throw error;
      }

      if (isClean) {
        const newLocal = "`git add`";
        throw new Error(
          `${style.yellow(">>> No files added to staging! Did you forget to run")} ${style.cyan(
            newLocal
          )} ?`
        );
      }
      injectEnv("break", argvs.czgitArgs.subCommand?.break);
      injectEnv("emoji", argvs.czgitArgs.subCommand?.emoji);
      injectEnv("checkbox", argvs.czgitArgs.subCommand?.checkbox);

      console.log(`czg@${version}\n`);
      // commit
      commit(
        inquirer as CommitizenType,
        getGitRootPath(),
        prompter,
        {
          args: argvs.gitArgs,
          disableAppendPaths: true,
          emitData: true,
          quiet: false,
          retryLastCommit: argvs.czgitArgs.flag?.retry || false,
          rebackLastCommit: argvs.czgitArgs.flag?.reback || false,
          hookMode: argvs.czgitArgs.flag?.hook || false
        },
        (error) => {
          if (error) {
            console.log("environment:", environment);
            throw error;
          }
        }
      );
    },
    shouldStageAllFiles
  );
};
