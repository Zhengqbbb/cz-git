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

OPTIONS:
    --config       Specify the configuration file to use
    --retry|-r     Direct retry submit by the last message
    --help|-h      Show help
    --version      Show version

EXAMPLES:
    czg
    czg emoji
    czg --config="./config/cz.json"

Extends 'git commit' command and options.
See 'git commit --help' for more information.
```
