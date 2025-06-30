---
title: czg
titleTemplate: Interactive Commitizen CLI that generate standardized git commit message
description: Interactive Commitizen CLI that generate standardized git commit messages
---

<h1 class="clip">czg</h1>
<p class="description">Interactive CLI that generate standardized git commit messages</p>

<p align="center">
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
      <img style="display:inline-block;margin:0.2em;" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zhengqbbb/cz-git?style=social">
    </a>
    <a target="_blank" href="https://github.com/agarrharr/awesome-cli-apps#git">
      <img style="display:inline-block;margin:0.2em;" alt="awesome-cli-app" src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg">
    </a>
    <br>
    <a href="https://www.npmjs.com/package/czg">
        <img style="display:inline-block;margin:0.2em;" alt="npm" src="https://img.shields.io/npm/v/czg?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSIjY2IwMDAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcgN2gyNnYyNmgtN1YxNGgtNnYxOUg3eiIvPjwvc3ZnPgo=">
    </a>
    <a href="https://formulae.brew.sh/formula/czg">
        <img style="display:inline-block;margin:0.2em;" alt="homebrew" src="https://img.shields.io/homebrew/v/czg?style=flat-square&logo=homebrew&label=homebrew">
    </a>
</p>

<br />

- ⚡️ **Lightweight** : Zero Dependencies (1.31MB)
- 🤗 **Simpler and Faster** : No plugin, No adapter, No extra steps, You can use `npx` | `npm script` | `global install`... quick start CLI in your any project
- 😎 **Highly Customizable** : Internally contains the core of cz-git. Extend all the features of cz-git. Same behavior, Same configuration loader... You can customize the commit CLI according to your need
- 🤖 **OpenAI Support.** Let the AI generate your git commit message.

![demo-gif](https://user-images.githubusercontent.com/40693636/175753060-cf4f5e48-100d-430a-93e9-31b17f42802f.gif) <!-- size=720x264 -->

## Quick start
1. Now try it out, use `npx czg` in **your any projects**
2. And then, let's try to simply configure it.
Create a `.czrc` file in the project root directory

<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const v = site.value.themeConfig.nav?.[4]?.text
</script>

```json-vue
{
  "$schema": "https://raw.githubusercontent.com/Zhengqbbb/cz-git/refs/tags/{{ v }}/docs/public/schema/cz-git.json",
  "scopes": [
    "hello",
    "world"
  ]
}
```

:::::tip
If you want to write JavaScript configuration, can import helper functions from `czg` or add `@type` to file

:::: code-group
::: code-group-item cz.config.js
```js
const { definePrompt } = require('czg')

module.exports = definePrompt({
    scopes: ['hello', 'world'],
})
```
:::
::: code-group-item cz.config.js
```js
/** @type {import('czg').UserConfig['prompt']} */
module.exports = {
    scopes: ['hello', 'world'],
}
```
:::
::: code-group-item commitlint.config.js
```js
const { defineConfig } = require('czg')

module.exports = defineConfig({
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
    },
    prompt: {
        scopes: ['hello', 'world'],
    },
})
```
:::
::: code-group-item commitlint.config.js
```js
/** @type {import('czg').UserConfig} */
module.exports = {
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
    },
    prompt: {
        scopes: ['hello', 'world'],
    },
}
```
:::
::::

More information about configure file and options. See → [Config](/config/)
:::::


## Features and Help

```ansi
[90m$[0m [32mczg[0m --help
[33mWEBSITE:[0m
    [4mhttps://cz-git.qbb.sh/cli/[0m
    [4mhttps://github.com/Zhengqbbb/cz-git[0m

[33mSYNOPSIS:[39m
    czg [subcommand...] [options...] [git-commit-options...]

[33mSUBCOMMAND:[39m
    [36mai[39m               [31mTurn on OpenAI generate subject mode[39m
    [36mbreak[39m            [31mTurn on appends a ! after the type/scope[39m
    [36memoji[39m            [31mTurn on output message with emoji mode[39m
    [36mcheckbox[39m         [31mTurn on scope checkbox mode[39m
    [36mgpg[39m              [31mTurn on use GPG sign commit message[39m

[33mOPTIONS:[39m
    [36m:, --alias=[39m      [31mDirectly submit the defined commit message[39m
    [36m--config=[39m        [31mSpecify the configuration file to use[39m

  [90mOpenAI:[39m
    [36m-N=,--ai-num=[39m    [31mSets AI return multiple subjects and Turn on choose mode[39m
    [36m-M=,--ai-model=[39m  [31mSets AI model in this session[39m
                     [90m[default: "gpt-4o-mini"][39m
                     [90m[example: "gpt-3.5-turbo", "gpt-4o", "gpt-4o-mini" ...][39m
    [36m--api-key=[39m       [31mSetup request OpenAI API secret key to local (.config/.czrc)[39m
    [36m--api-model=[39m     [31mSetup request OpenAI API model      to local (.config/.czrc)[39m
    [36m--api-proxy=[39m     [31mSetup request OpenAI API proxy      to local (.config/.czrc)[39m
    [36m--api-endpoint=[39m  [31mSetup request OpenAI API endpoint   to local (.config/.czrc)[39m
                     [90m[default: "https://api.openai.com/v1"][39m

[33mFLAG:[39m
    [36m-r, --retry[39m      [31mDirectly retry submit by the last message[39m
    [36m--no-ai[39m          [31mTurn off AI prompt mode in this session[39m
    [36m--unset-proxy[39m    [31mUnset request API proxy on local configure[39m
    [36m-h, --help[39m       [31mShow help[39m
    [36m-v, --version[39m    [31mShow version[39m

[33mEXAMPLES:[39m
    [36mczg[39m
    [36mczg emoji[39m
    [36mczg :fd[39m
    [36mczg --config="./config/cz.json"[39m
    [36mczg --api-key="sk-XXXXX"[39m
    [36mczg ai -N=3 -M="gpt-4o"[39m

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
