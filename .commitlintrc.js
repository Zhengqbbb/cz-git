const { execSync } = require("child_process");
const fg = require("fast-glob");

// @description: git branch name = feature/issue_33 => auto get defaultIssues = #33
const issue = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .trim()
  .split("_")[1];
// @description: monorepo dynamic get name
const packages = fg.sync('*', { cwd: "packages/@cz-git", onlyDirectories: true });

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["cz-git", "site", ...packages]],
    "subject-min-length": [2, "always", 2],
    "subject-empty": [2, "never"]
  },
  prompt: {
    // @see: https://github.com/Zhengqbbb/cz-git#options
    themeColorCode: "38;5;043",
    issuePrefixes: [
      { value: "link",   name: "link:     Work in processing to ISSUES" },
      { value: "closed", name: "closed:   ISSUES has been processed" }
    ],
    customIssuePrefixesAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`
  }
};
