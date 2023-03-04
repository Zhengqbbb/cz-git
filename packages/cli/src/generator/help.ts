import { style } from 'cz-git'

/** `czg` help document */
export const generateHelp = (version: string, code = 0) => {
  // prettier-ignore
  console.log(
    `${style.yellow('NAME:')} 
    ${style.green('czg')} - Interactive Commitizen CLI that generate standardized git commit message

${style.yellow('WEBSITE:')}
    ${style.underline('https://cz-git.qbb.sh/cli/')}
    ${style.underline('https://github.com/Zhengqbbb/cz-git')}

${style.yellow('VERSION:')} ${version}

${style.yellow('SYNOPSIS:')}
    czg [subcommand...] [options...] [git-commit-options...]

${style.yellow('SUBCOMMAND:')}
    ${style.cyan('ai')}               ${style.red('Turn on OpenAI generate subject mode')}
    ${style.cyan('break')}            ${style.red('Turn on appends a ! after the type/scope')}
    ${style.cyan('emoji')}            ${style.red('Turn on output message with emoji mode')}
    ${style.cyan('checkbox')}         ${style.red('Turn on scope checkbox mode')}
    ${style.cyan('gpg')}              ${style.red('Turn on use GPG sign commit message')}
    
${style.yellow('OPTIONS:')}
    ${style.cyan(':, --alias')}       ${style.red('Directly submit the defined commit message')}
    ${style.cyan('-r, --retry')}      ${style.red('Directly retry submit by the last message')}
    ${style.cyan('--config=')}        ${style.red('Specify the configuration file to use')}
    ${style.cyan('--openai-token=')}  ${style.red('Setup OpenAI API secret key to local (.config/.czrc)')}
    ${style.cyan('--api-proxy=')}     ${style.red('Setup request OpenAI API proxy to local (.config/.czrc)')}
    ${style.cyan('-N=,--ai-num=')}    ${style.red('Setting AI return number subjects and Turn on choose mode')}
    ${style.cyan('--no-ai')}          ${style.red('Turn off AI prompt mode in this session')}
    ${style.cyan('--unset-proxy')}    ${style.red('Unset request API proxy on local configure')}
    ${style.cyan('-h, --help')}       ${style.red('Show help')}
    ${style.cyan('-v, --version')}    ${style.red('Show version')}

${style.yellow('EXAMPLES:')}
    ${style.cyan('czg')}
    ${style.cyan('czg emoji')}
    ${style.cyan('czg :fd')}
    ${style.cyan('czg --config="./config/cz.json"')}
    ${style.cyan('czg --openai-token="sk-XXXXX"')}
    ${style.cyan('czg ai -N=3')}

Extends 'git commit' options. 
See 'git commit --help' for more information. `,
  )
  process.exit(code)
}
