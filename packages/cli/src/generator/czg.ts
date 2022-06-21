import { CommitizenType, prompter, style } from "cz-git";
import inquirer from "inquirer";
import { commit } from "./commit";
import { isGitClean, getGitRootPath } from "../shared";

/**
 * start inquirer prompts to commit message
 */
export const czg = (version: string, commandArgs: string[], environment: any = {}) => {
  // TODO: parse commandArgs
  // console.log(commandArgs);
  // console.log(environment);
  // parse git hook and git -a
  // isClean
  isGitClean(
    process.cwd(),
    (error, isClean) => {
      if (error) {
        throw error;
      }

      if (isClean) {
        throw new Error(
          `No files added to staging! Did you forget to run ${style.cyan("git add")} ?`
        );
      }

      console.log(`czg@${version}\n`);
      // commit
      commit(
        inquirer as CommitizenType,
        getGitRootPath(),
        prompter,
        {
          args: [],
          disableAppendPaths: true,
          emitData: true,
          quiet: false,
          retryLastCommit: false,
          hookMode: false
        },
        (error) => {
          if (error) {
            console.log(environment);
            throw error;
          }
        }
      );
    },
    false
  );
};
