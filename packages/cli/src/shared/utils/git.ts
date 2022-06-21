import { exec, execSync, spawn, spawnSync } from "child_process";
import dedent from "dedent";
import { closeSync, openSync, writeSync } from "fs";
import path from "path";
import type { CallBackFn, CommitOptions } from "../types";

/**
 * Use git diff command check the files are no staged files and no changes.
 * @param {string} repoPath current repo path
 * @param {CallBackFn} done callback function
 * @param {boolean} stageAllFiles if true, will stage all files e.g `git commit -a`
 * done callback function will return isClean
 * @time cost 27 ms
 */
export const isGitClean = (repoPath: string, done: CallBackFn, stageAllFiles: boolean) => {
  // TODO: can use asynchronously concurrency resovle command
  // if there are no staged files and no changes, but fails to throw an error with no staged files in dirty state.
  exec(
    `git diff --cached --no-ext-diff --name-only ${
      !!stageAllFiles ? "&& git diff --no-ext-diff --name-only" : ""
    }`,
    {
      maxBuffer: Infinity,
      cwd: repoPath
    },
    function (error, stdout) {
      if (error) {
        return done(error);
      }
      const output = stdout || "";
      done(null, output.trim().length === 0);
    }
  );
};

/**
 * Get current repo path
 * @time cost 12 ms
 */
export const getGitRootPath = () =>
  spawnSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).stdout.trim();

/**
 * Get current repo .git folder path
 * @time cost 12 ms
 */
export const getGitDirPath = (pwd: string) =>
  execSync("git rev-parse --absolute-git-dir", { encoding: "utf8", cwd: pwd }).trim();

/**
 * Core
 *
 * Asynchronously git commit at a given path with a message
 */
export const gitCommit = (
  repoPath: string,
  message: string,
  options: CommitOptions,
  done: CallBackFn
) => {
  let called = false;
  /**
   * nomorl mode. unuse git hook
   * use `git cimmit -m "...message..."`
   */
  if (!options.hookMode) {
    const args = ["commit", "-m", dedent(message), ...(options.args || [])];
    const child = spawn("git", args, {
      cwd: repoPath,
      stdio: options.quiet ? "ignore" : "inherit"
    });

    child.on("error", (e) => {
      if (called) return;
      called = true;

      done(e);
    });

    child.on("exit", (code, signal) => {
      if (called) return;
      called = true;

      if (code) {
        if (code === 128) {
          console.warn(`
          Git exited with code 128. Did you forget to run:

              git config --global user.email "you@example.com"
              git config --global user.name "Your Name"
          `);
        }
        done(Object.assign(new Error(`git exited with error code ${code}`), { code, signal }));
      } else {
        // e.g: like control + c
        done(null);
      }
    });
  } else {
    /**
     * use git hookMode.write the commit message into
     * the .git/COMMIT_EDITMSG file
     */
    const commitMsgFile = path.join(getGitDirPath(repoPath), "COMMIT_EDITMSG");
    try {
      const fd = openSync(commitMsgFile, "w");
      try {
        writeSync(fd, dedent(message));
        done(null);
      } catch (e: any) {
        done(e);
      } finally {
        closeSync(fd);
      }
    } catch (e) {
      // for windows user
      try {
        const fd = openSync(commitMsgFile, "w");
        try {
          writeSync(fd, dedent(message));
          done(null);
        } catch (e: any) {
          done(e);
        } finally {
          closeSync(fd);
        }
      } catch (e: any) {
        done(e);
      }
    }
  }
};
