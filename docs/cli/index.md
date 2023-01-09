---
title: czg
titleTemplate: Interactive Commitizen CLI that generate standardized commit messages
description: Interactive Commitizen CLI that generate standardized commit messages
---

<h1 class="clip">czg</h1>
<p class="description">Interactive Commitizen CLI that generate standardized commit messages</p>

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

- ⚡️ **Lightweight** : Zero Dependencies (1.3MB)
- 🤗 **Simpler and Faster** : No plugin, No adapter, No extra steps, You can use `npx` | `npm script` | `global install`... quick start CLI in your any project
- 😎 **Highly Customizable** : Internally contains the core of cz-git. Extend all the features of cz-git. Same behavior, Same configuration loader... You can customize the commit CLI according to your need

![demo-gif](https://user-images.githubusercontent.com/40693636/175753060-cf4f5e48-100d-430a-93e9-31b17f42802f.gif) <!-- size=688x264 -->

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

:::tip
More information about configure file and options. See → [Config](/config/)
:::


## Features and Help

```sh
$ czg --help
NAME:
    czg - Interactive Commitizen CLI that generate standardized commit messages

WEBSITE:
    https://cz-git.qbb.sh/cli/
    https://github.com/Zhengqbbb/cz-git

SYNOPSIS:
    czg [subcommand...] [options...] [git-commit-options...]

SUBCOMMAND:
    break          Turn on appends a ! after the type/scope
    emoji          Turn on output message with emoji mode
    checkbox       Turn on scope checkbox mode
    gpg            Turn on use GPG sign commit message

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

Extends 'git commit' options.
See 'git commit --help' for more information.
```

## Projects using czg CLI

<table>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/nrwl/nx">
        <img src="https://user-images.githubusercontent.com/40693636/211251507-e45992b8-6e49-44e4-933c-100a68f5ff48.png" alt="Nx logo" width="40">
        <sub>Nx</sub>
      </a>
    </td>
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
  </tr>
</table>

## LICENSE

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> (https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?
