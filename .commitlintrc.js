const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process');

// @description: git branch name = feature/issue_33 => auto get defaultIssues = #33
const issue = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .split("_")[1]
// @description: monorepo dynamic get name
const packages = fs.readdirSync(path.resolve(__dirname, 'packages/@cz-git'));

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", [ "cz-git", "guide", ...packages ]],
    "subject-min-length": [2, 'always', 2],
    "subject-empty": [2, "never"],
  },
  prompt: {
    // @see: https://github.com/Zhengqbbb/cz-git#options
    issuePrefixs: [
      { value: "link",   name: "link:     Work in processing to ISSUES" },
      { value: "closed", name: "closed:   ISSUES has been processed" }
    ],
    customIssuePrefixsAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`
  }
};
