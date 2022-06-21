// import path from "path";
import cacheDir from "cachedir";
import { ensureDir } from "fs-extra";
import { gitCommit } from "../shared";
import type { CommitizenType } from "cz-git";
import type { CallBackFn, CzGitPrompter, CommitOptions } from "../shared";

/**
 * generate cz-git prompt get commit message
 */
export const commit = (
  inquirer: CommitizenType,
  rootPath: string,
  prompter: CzGitPrompter,
  options: CommitOptions,
  done: CallBackFn
) => {
  const cacheDirectory = cacheDir("cz-git");
  // const cachePath = path.join(cacheDirectory, "commit.json");

  ensureDir(cacheDirectory, (err: any) => {
    if (err) {
      console.error("Couldn't create commitizen cache directory: ", err);
    } else {
      if (options.retryLastCommit) {
        console.log("Retrying last commit attempt.");
        // TODO: get cache data
        // TODO: retry last commit
      } else {
        prompter(inquirer, (commitMsg: string | Error) => {
          if (commitMsg instanceof Error) {
            return done(commitMsg);
          }
          // TODO: add cache
          gitCommit(rootPath, commitMsg, options, done);
        });
      }
    }
  });
};
