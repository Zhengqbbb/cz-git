/**
 * @description update "Project using `cz-git` `czg`"
 * @use `pnpm docs:update`
 */

import fs from 'node:fs'
import ora from 'ora'
// @ts-expect-error
import yaml from 'js-yaml'
import { resolve } from 'pathe'

const CZ_GIT_READMES = ['../packages/cz-git/README.md', '../README.md']
const CZ_git_DOCS = [
    '../docs/guide/introduction.md',
    '../docs/zh/guide/introduction.md',
]
const CZG_READMES = ['../packages/cli/README.md']
const CZG_DOCS = ['../docs/cli/index.md', '../docs/zh/cli/index.md']

interface Source {
    name: string
    link: string
    icon: string
}

interface Data {
    'czg': Source[]
    'cz-git': Source[]
}

function genTdItem(item: Source, isBreak: boolean) {
    return `\n    <td align="center" width="200px">
      <a target="_blank" href="${item.link}">
        <img src="${item.icon}" alt="${item.name} logo" width="40">${isBreak ? '<br>' : ''}
        <sub>${item.name}</sub>
      </a>
    </td>`
}

function genProjectUseCzGite(data: Data, key: 'czg' | 'cz-git', isBreak: boolean) {
    const source = data[key]
    let result = '<table>\n  <tr>'
    source.forEach((item, index) => {
        const isTrEnd = (index !== 0 && (index + 1) % 4 === 0) || index === source.length - 1
        if (isTrEnd) {
            result += `${genTdItem(item, isBreak)}\n  </tr>${index === source.length - 1 ? '' : '\n  <tr>'}`
        }
        else {
            result += genTdItem(item, isBreak)
        }
    })
    return (result += '\n</table>')
}

function genTableByPaths(paths: string[], data: any, key: 'czg' | 'cz-git', isBreak: boolean) {
    paths.forEach((p) => {
        let readme = fs.readFileSync(resolve(__dirname, p), 'utf8')
        if (readme)
            readme = readme.replace(/<table>(.|\n)*?<\/table>/, genProjectUseCzGite(data, key, isBreak))

        fs.writeFileSync(resolve(__dirname, p), readme)
    })
}

// Main
const spinner = ora('\u001B[38;5;043mUpdate Project using cz-git Table...\u001B[0m 📦').start()
try {
    const start = Date.now()
    const data = yaml.load(fs.readFileSync(resolve(__dirname, './docs-update-use-data.yml'), 'utf8'))

    genTableByPaths(CZ_GIT_READMES, data, 'cz-git', true)
    genTableByPaths(CZ_git_DOCS, data, 'cz-git', false)
    genTableByPaths(CZG_READMES, data, 'czg', true)
    genTableByPaths(CZG_DOCS, data, 'czg', false)
    spinner.succeed(
        `\u001B[38;5;043mSuccessfully updated table! ${((Date.now() - start) / 1000).toFixed(
            2,
        )}s\u001B[0m ✨`,
    )
}
catch (e) {
    spinner.fail(`post-build enchance pages failed: ${e}`)
}
