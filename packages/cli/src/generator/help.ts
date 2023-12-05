import { style } from 'cz-git'

/** `czg` help document */
export function generateHelp(version: string, code = 0) {
  // prettier-ignore
  console.log(
    `${style.yellow('NAME:')} 
    ${style.green('czg')} - Interactive Commitizen CLI that generate standardized git commit message

${style.yellow('WEBSITE:')}
    ${style.underline('https://cz-git.qbb.sh/cli/')}
    ${style.underline('https://github.com/Zhengqbbb/cz-git')}

${style.yellow('VERSION:')} ${version}

${style.yellow('SYNOPSIS:')}
    czg [flag|options...] [git-commit-options...] [type list item search keywords]

${style.yellow('FLAG:')}
    ${style.cyan('-r, --retry')}      ${style.red('Directly retry submit by the last message')}
    ${style.cyan('-a, --all')}        ${style.red('Automatically stage files that have been modified and deleted (Not new files)')}
    ${style.cyan('-b, --break')}      ${style.red('Turn on appends a ! after the type/scope')}
    ${style.cyan('-E, --emoji')}      ${style.red('Turn on output message with emoji mode')}
    ${style.cyan('-S, --gpg-sign')}   ${style.red('Turn on use GPG sign commit message')}
    ${style.cyan('-cb, --checkbox')}  ${style.red('Turn on scope checkbox mode')}
    ${style.cyan('-ai, --ai')}        ${style.red('Turn on OpenAI generate subject mode')}
    ${style.cyan('--no-ai')}          ${style.red('Turn off OpenAI prompt mode in this session')}
    ${style.cyan('--unset-proxy')}    ${style.red('Unset request API proxy on local configure')}
    ${style.cyan('-h, --help')}       ${style.red('Show help')}
    ${style.cyan('-v, --version')}    ${style.red('Show version')}

${style.yellow('OPTIONS:')}
    ${style.cyan(':, --alias=')}      ${style.red('Directly submit the defined commit message')}
    ${style.cyan('--config=')}        ${style.red('Specify the configuration file to use')}
    
  ${style.gray('OpenAI:')}
    ${style.cyan('-N=,--ai-num=')}    ${style.red('Setting AI return number subjects and Turn on choose mode')}
    ${style.cyan('--api-key=')}       ${style.red('Setup request OpenAI API secret key to local (.config/.czrc)')}
    ${style.cyan('--api-proxy=')}     ${style.red('Setup request OpenAI API proxy      to local (.config/.czrc)')}
    ${style.cyan('--api-endpoint=')}  ${style.red('Setup request OpenAI API endpoint   to local (.config/.czrc)')}
                     ${style.gray('[default: "https://api.openai.com/v1"]')}

${style.yellow('EXAMPLES:')}
    ${style.cyan('czg')}
    ${style.cyan('czg ch')} | ${style.cyan('czg ix')}
    ${style.cyan('czg -a -E')}
    ${style.cyan('czg :fd')}
    ${style.cyan('czg --config="./config/cz.json"')}
    ${style.cyan('czg --api-key="sk-XXXXX"')}
    ${style.cyan('czg -ai -N=3')}

Extends 'git commit' options. 
See 'git commit --help' for more information. `,
  )
  process.exit(code)
}
