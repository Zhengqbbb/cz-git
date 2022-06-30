---
title: czg
titleTemplate: 交互式命令行工具生成标准化的 git commit message
description: 交互式命令行工具生成标准化的 git commit message
---

<h1 class="clip">czg</h1>
<p class="description">交互式命令行工具生成标准化的 git commit message</p>

<p align="center">
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
      <img style="display:inline-block;margin:0.2em;" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zhengqbbb/cz-git?style=social">
    </a>
    <a target="_blank" href="https://github.com/agarrharr/awesome-cli-apps#git">
      <img style="display:inline-block;margin:0.2em;" alt="awesome-cli-app" src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg">
    </a>
    <br>
    <a href="https://www.npmjs.com/package/czg">
        <img style="display:inline-block;margin:0.2em;" alt="npm" src="https://img.shields.io/npm/v/czg?style=flat-square&logo=npm">
    </a>
    <a href="https://formulae.brew.sh/formula/czg">
        <img style="display:inline-block;margin:0.2em;" alt="homebrew" src="https://img.shields.io/homebrew/v/czg?style=flat-square&logo=homebrew&label=homebrew">
    </a>
</p>

<br />

- **轻量级** : 零依赖项 (1.3MB)
- **简单且快速** : 无需前置配置，无需适配器，没有额外的步骤，你可以使用 `npx` | `npm 脚本` | `全局下载`... 在你的任何项目中快速启动
- **可定制化** : 内部包含 cz-git 的核心，继承了 cz-git 的所有特性，具有相同的行为，配置加载... 你可以根据自己的需要配置的 CLI 的行为

![demo](https://user-images.githubusercontent.com/40693636/175753060-cf4f5e48-100d-430a-93e9-31b17f42802f.gif)

## 快速入门
1. 你在你任何的项目中运行 `npx czg`
2. 接下来让我们进行简单的配置，查看效果。创建 `.czrc` 在你的项目根路径中，然后运行相同的命令

```json
{
  "scopes": [
    "hello",
    "world"
  ]
}
```

:::tip
关于配置文件以及配置项的更多信息，可查看 → [配置](/config/)
:::


## 特性以及帮助文档

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
    :, --alias     Directly submit the defined commit message
    -r, --retry    Direct retry submit by the last message
    -h, --help     Show help
    -v, --version  Show version

EXAMPLES:
    czg
    czg emoji
    czg :ff
    czg --alias=ff
    czg --config="./config/cz.json"

Extends 'git commit' command and options.
See 'git commit --help' for more information.
```
