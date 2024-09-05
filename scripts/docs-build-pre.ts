/*
 * @Description: provide pre script `pnpm docs:build`
 * @Author: Qbenben
 * @LastEditors: Qbenben
 * @LastEditTime: 2024-09-02 20:56:00
 */

import fs from 'node:fs'
import ora from 'ora'
import { resolve } from 'pathe'

/**
 * @description: Enhance shell script code syntax highlight for docs `shiki`
 */
async function resolveShikiEnhanceShell() {
    const dataPath = resolve(__dirname, '../node_modules/shiki/languages/shellscript.tmLanguage.json')
    // eslint-disable-next-line ts/no-require-imports
    const data = require(dataPath)
    data.repository.support.patterns.pop()
    data.repository.support.patterns.push(
        {
            match: '(?<=^|;|&|\\s)(?:alias|bg|bind|builtin|caller|cd|du|command|compgen|complete|dirs|disown|echo|enable|eval|exec|exit|false|fc|fg|getopts|hash|history|jobs|kill|let|logout|popd|printf|pushd|pwd|read|readonly|set|shift|shopt|source|suspend|test|times|trap|true|type|ulimit|umask|unalias|unset|wait)(?=\\s|;|&|$)',
            name: 'keyword',
        },
        {
            match: '(?<=^|;|&|\\s)(?:npm|npx|yarn|pnpm|brew|git)',
            name: 'keyword',
        },
        {
            match: '(?<=^|;|&|\\s)(?:install -g|install -D|add -D|install)',
            name: 'string',
        },
        {
            match: '(?<=^)(cz-git|czg)',
            name: 'keyword',
        },
        {
            match: '(?<=^|;|&|\\s)(?:cz-git|czg|commitizen)',
            name: 'support.class',
        },
    )
    fs.writeFileSync(resolve(dataPath), JSON.stringify(data), 'utf-8')
}

// Main
const spinner = ora('\u001B[38;5;043mUpdate Project using cz-git Table...\u001B[0m 📦').start()
try {
    const start = Date.now()

    resolveShikiEnhanceShell()

    spinner.succeed(
        `\u001B[38;5;043mSuccessfully enhanced docs! ${((Date.now() - start) / 1000).toFixed(
            2,
        )}s\u001B[0m ✨`,
    )
}
catch (e) {
    spinner.fail(`post-build enchance pages failed: ${e}`)
}
