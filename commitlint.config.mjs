import { execSync } from 'node:child_process'
import { defineConfig } from 'cz-git'
import fg from 'fast-glob'

/** Get git branch issue number. e.g feature/cli_33 => #33 */
const issue = execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim()
    .split('_')[1]

/** Get monorepo packages name */
const packages = fg
    .sync('*', { cwd: 'packages/@cz-git', onlyDirectories: true })

export default defineConfig({
    extends: ['@commitlint/config-conventional'],
    rules: {
        'scope-enum': [2, 'always', ['cz-git', 'site', 'cli', ...packages]],
        'subject-min-length': [2, 'always', 2],
        'subject-empty': [2, 'never'],
    },
    prompt: {
        alias: {
            'b': 'chore: bump dependencies',
            'c': 'chore: update config files',
            'f': 'docs: fix typos',
            ':': 'docs: update README',
            'schema': 'chore: update czrc configure JSON schema',
            'table:data': 'chore: :hammer: update project using table data',
            'table:docs': 'docs: update project using table',
        },
        themeColorCode: '38;5;043',
        issuePrefixes: [
            { value: 'link', name: 'link:     Work in processing to ISSUES' },
            { value: 'closed', name: 'closed:   ISSUES has been processed' },
        ],
        aiDiffIgnore: ['pnpm-lock.yaml', 'docs/public'],
        customIssuePrefixAlign: !issue ? 'top' : 'bottom',
        defaultIssues: !issue ? '' : `#${issue}`,
    },
})
