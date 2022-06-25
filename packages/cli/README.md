<h1 align="center">czg</h1>

> Interactive Commitizen CLI that generate standardized commit messages

<p align="center">
    <a href="https://www.npmjs.com/package/czg">
        <img style="display:inline-block;margin:0.2em;" alt="npm" src="https://img.shields.io/npm/v/czg?style=flat-square&logo=npm">
    </a>
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
      <img style="display:inline-block;margin:0.2em;" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zhengqbbb/cz-git?style=social">
    </a>
</p>

<p align="center">
    <a href="https://github.com/Zhengqbbb/cz-git">Github</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbenben.com/cli/install.html">Installation</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbenben.com/cli/">Website</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbenben.com/zh/cli/">简体中文文档</a>
</p>

<br/>
<br/>

- **Lightweight** : Zero Dependencies (1.3MB)
- **Simpler and Faster** : No plugin, No adapter, No extra steps, You can use `npx` | `npm script` | `global install`... quick start CLI in your any project
- **Highly Customizable** : Internally contains the core of cz-git. Extend all the features of cz-git. Same behavior, Same configuration loader... You can customize the commit CLI according to your need

![demo](https://user-images.githubusercontent.com/40693636/175753060-cf4f5e48-100d-430a-93e9-31b17f42802f.gif)

## Quick start
1. Now try it out, use `npx czg` in **your any projects**
2. And then, let's try to simply configure it.
Create a `.czrc` file in the project root directory

```json
{
  "scopes": [
    "hello",
    "world"
  ]
}
```

> **Note**
> More information about configure file and options. See → [Config](https://cz-git.qbenben.com/config/)

## Features and Help


```sh
$ czg --help
NAME:
    czg - Interactive Commitizen CLI that generate standardized commit messages

WEBSITE:
    https://cz-git.qbenben.com/cli/
    https://github.com/Zhengqbbb/cz-git

SYNOPSIS:
    czg [subcommand] [options]

SUBCOMMAND:
    break          Turn on BREAKING CHANGE mode, Add ! mark on header
    emoji          Turn on output message with emoji mode
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

## Installation

```
npm install -g czg
```

[⇒ Get Started](https://cz-git.qbenben.com/cli/install.html)

## Configure Template

[⇒ Configure Template](https://cz-git.qbenben.com/config/)

## Options

[⇒ Show Related](https://cz-git.qbenben.com/config/show.html)

[⇒ Engineering Related](https://cz-git.qbenben.com/config/engineer.html)

## Recipes

[⇒ Recipes](https://cz-git.qbenben.com/recipes/)

## FAQ

[⇒ FAQ](https://cz-git.qbenben.com/faq/)

## LICENSE

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> (https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?
