import { style } from 'cz-git'

/** `czg` help document */
export const generateHelp = (version: string, code = 0) => {
  // prettier-ignore
  console.log(
    `${style.yellow('NAME:')} 
    ${style.green('czg')} - Interactive Commitizen CLI that generate standardized commit messages

${style.yellow('WEBSITE:')}
    ${style.underline('https://cz-git.qbb.sh/cli/')}
    ${style.underline('https://github.com/Zhengqbbb/cz-git')}

${style.yellow('VERSION:')} ${version}

${style.yellow('SYNOPSIS:')}
    czg [subcommand...] [options...] [git-commit-options...]

${style.yellow('SUBCOMMAND:')}
    ${style.cyan('break')}          ${style.red('Turn on BREAKING CHANGE mode, Add ! mark on header')}
    ${style.cyan('emoji')}          ${style.red('Turn on output message with emoji mode')}
    ${style.cyan('checkbox')}       ${style.red('Turn on scope checkbox mode')}
    ${style.cyan('gpg')}            ${style.red('Turn on use GPG sign commit message')}
    
${style.yellow('OPTIONS:')}
    ${style.cyan('--config')}       ${style.red('Specify the configuration file to use')}
    ${style.cyan(':, --alias')}     ${style.red('Directly submit the defined commit message')}
    ${style.cyan('-r, --retry')}    ${style.red('Directly retry submit by the last message')}
    ${style.cyan('-h, --help')}     ${style.red('Show help')}
    ${style.cyan('-v, --version')}  ${style.red('Show version')}

${style.yellow('EXAMPLES:')}
    ${style.cyan('czg')}
    ${style.cyan('czg emoji')}
    ${style.cyan('czg :fd')}
    ${style.cyan('czg --alias=fd')}
    ${style.cyan('czg --config="./config/cz.json"')}

Extends 'git commit' options. 
See 'git commit --help' for more information. `,
  )
  process.exit(code)
}
