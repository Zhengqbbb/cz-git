---
title: czg
titleTemplate: 交互式命令行工具(Commitizen CLI)生成标准化的 git commit message
description: 交互式命令行工具(Commitizen CLI)生成标准化的 git commit message
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
    https://cz-git.qbb.sh/cli/
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
    -r, --retry    Directly retry submit by the last message
    -h, --help     Show help
    -v, --version  Show version

EXAMPLES:
    czg
    czg emoji
    czg :fd
    czg --alias=fd
    czg --config="./config/cz.json"

Extends 'git commit' command and options.
See 'git commit --help' for more information.
```

## Projects using czg CLI

<table>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/element-plus/element-plus">
        <img src="https://user-images.githubusercontent.com/40693636/172459748-939e3f1b-a694-4c09-b643-e1dce602105c.png" alt="Element Plus logo" width="40">
        <sub>Element Plus</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/Tencent/tdesign-vue-next">
        <img src="https://user-images.githubusercontent.com/40693636/170830562-38e4c998-9af4-4303-9270-4f14e0942b08.png" alt="TDesign-Vue-Next logo" width="40">
        <sub>TDesign-Vue-Next</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/vbenjs/vue-vben-admin">
        <img src="https://user-images.githubusercontent.com/40693636/178189964-931a1fc2-92df-4d04-8d0d-b748fc318c0a.png" alt="Vben-Admin logo" width="40">
        <sub>Vben-Admin</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/buqiyuan/vue3-antd-admin">
        <img src="https://user-images.githubusercontent.com/40693636/170830597-31d6f0d7-2c93-491b-a984-7bf21db8f75b.png" alt="Vue3-Antd-Admin logo" width="40">
        <sub>Vue3-Antd-Admin</sub>
      </a>
    </td>
  </tr>
</table>

## LICENSE

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> (https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?
