# czg

> Interactive Commitizen CLI that generate standardized commit messages

WIP

```sh
$ npx czg --help
NAME:
    czg - Interactive Commitizen CLI that generate standardized commit messages

WEBSITE:
    https://cz-git.qbenben.com/cli/
    https://github.com/Zhengqbbb/cz-git

SYNOPSIS:
    czg [subcommand] [options]

SUBCOMMAND:
    break          Turn on BREAKING CHANGE mode, Add ! mark on header
    emoji          Turn on emoji mode
    checkbox       Turn on scope checkbox mode
    init           Generate initialize commitizen configFile and guide
                   Default porvide interactive prompt. skip 'czg init -y'

OPTIONS:
    --config       Specify the configuration file to use
    --reback|-b    Provide interactive prompt by the last message
    --retry|-r     Direct retry submit by the last message
    --help|-h      Show help
    --version      Show version

EXAMPLES:
    czg
    czg emoji
    czg --config="./config/cz.json"

Run 'czg SUBCOMMAND --help' for more information on a command.
Extends 'git commit' command and options.
See 'git commit --help' for more information.
```
