import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { open as tempOpen } from "temp";
import { Answers, CommitizenGitOptions } from "../share";
import { buildCommit, log } from "./until";

/**
 * @description: fork by "temp/open"
 */

/**
 * @description: fork by "editor"
 */
const editor = (file?: string, opts?: any | object, cb?: any) => {
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  if (!opts) opts = {};

  const ed = /^win/.test(process.platform) ? "notepad" : "vim";
  const editor = opts.editor || process.env.VISUAL || process.env.EDITOR || ed;
  const args = editor.split(/\s+/);
  const bin = args.shift();

  const ps = spawn(bin, args.concat([file]), { stdio: "inherit" });

  ps.on("exit", function (code, sig) {
    if (typeof cb === "function") cb(code, sig);
  });
};

export const editCommit = (
  answers: Answers,
  options: CommitizenGitOptions,
  cb: (message: string) => void
) => {
  tempOpen(undefined, (err, info) => {
    if (!err) {
      fs.writeSync(info.fd, buildCommit(answers, options));
      fs.close(info.fd, () => {
        editor(info.path, (code: number) => {
          if (code === 0) {
            const commitStr = fs.readFileSync(info.path, {
              encoding: "utf8"
            });
            cb(commitStr);
          } else {
            log(
              "warm",
              `Editor exit non zero. Commit message was:\n${buildCommit(answers, options)}`
            );
          }
        });
      });
    }
  });
};

export const getPreparedCommit = (context: string) => {
  let message = null;
  if (fs.existsSync(path.resolve(__dirname, "./.git/COMMIT_EDITMSG"))) {
    const prepared = fs.readFileSync(path.resolve(__dirname, "./.git/COMMIT_EDITMSG"), "utf-8");

    const preparedCommit = prepared
      .replace(/^#.*/gm, "")
      .replace(/^\s*[\r\n]/gm, "")
      .replace(/[\r\n]$/, "")
      .split(/\r\n|\r|\n/);

    if (preparedCommit.length && preparedCommit[0]) {
      if (context === "subject") [message] = preparedCommit;
      else if (context === "body" && preparedCommit.length > 1) {
        preparedCommit.shift();
        message = preparedCommit.join("|");
      }
    }
  }
  return message;
};
