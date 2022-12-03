const { execSync } = require('child_process')
const fg = require('fast-glob')

// git branch name = feature/cli_33 => auto get defaultIssues = #33
const issue = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .split('_')[1]

// monorepo dynamic get name
const packages = fg.sync('*', { cwd: 'packages/@cz-git', onlyDirectories: true })

// custom add Co-authored-by
const coAuthoredBy
  = '\n\n'
  + `Co-authored-by: ${
     execSync('git config user.name').toString().replace(/(\r\n\t|\n|\r\t)/g, '')
     } <${
     execSync('git config user.email').toString().replace(/(\r\n\t|\n|\r\t)/g, '')
     }>`

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['cz-git', 'site', 'cli', ...packages]],
    'subject-min-length': [2, 'always', 2],
    'subject-empty': [2, 'never'],
  },
  prompt: {
    // @see: https://github.com/Zhengqbbb/cz-git#options
    alias: {
      'b': 'chore: bump dependencies' + coAuthoredBy,
      'c': 'chore: update config files' + coAuthoredBy,
      'f': 'docs: fix typos' + coAuthoredBy,
      ':': 'docs: update README' + coAuthoredBy,
      'table:data': 'chore: :hammer: update project using table data' + coAuthoredBy,
      'table:docs': 'docs: update project using table' + coAuthoredBy,
    },
    themeColorCode: '38;5;043',
    issuePrefixs: [
      { value: 'link', name: 'link:     Work in processing to ISSUES' },
      { value: 'closed', name: 'closed:   ISSUES has been processed' },
    ],
    customIssuePrefixAlign: !issue ? 'top' : 'bottom',
    defaultIssues: !issue ? '' : `#${issue}`,
    formatMessageCB: ({ defaultMessage }) => defaultMessage + coAuthoredBy,
  },
}
