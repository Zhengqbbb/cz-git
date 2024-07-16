<p align="center">
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
        <img src="https://user-images.githubusercontent.com/40693636/154064210-964aeaa0-d9dc-4cea-9e52-2ffc3789611b.png" alt="cz-git-logo" width="400" data-width="400" data-height="400">
    </a>
</p>

<h1 align="center">cz-git</h1>

<p align="center">
    <a target="_blank" href="https://github.com/commitizen/cz-cli#adapters">
      <img style="display:inline-block;margin:0.2em;" alt="Commitizen-Adapter" src="https://img.shields.io/badge/Commitizen-Adapter-red.svg?logo=git&style=flat">
    </a>
    <a target="_blank" href="https://cz-git.qbb.sh/cli/">
      <img style="display:inline-block;margin:0.2em;" alt="CLI-Link" src="https://img.shields.io/badge/Commitizen-CLI-red.svg?logo=git&style=flat">
    </a>
    <br/>
    <a target="_blank" href="http://commitizen.github.io/cz-cli/">
      <img style="display:inline-block;margin:0.2em;" alt="commitizen-friendly" src="https://img.shields.io/badge/Commitizen-friendly-brightgreen.svg?logo=github">
    </a>
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
      <img style="display:inline-block;margin:0.2em;" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zhengqbbb/cz-git?style=social">
    </a>
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git/actions/workflows/nodejs.yml">
      <img style="display:inline-block;margin:0.2em;" alt="test-ci" src="https://github.com/Zhengqbbb/cz-git/workflows/Node.js%20CI/badge.svg">
    </a>
    <br>
    <a href="https://www.npmjs.com/package/cz-git">
        <img style="display:inline-block;margin:0.2em;" alt="npm-download" src="https://img.shields.io/npm/dm/cz-git.svg?color=blue&style=flat-square&label=cz-git&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSIjY2IwMDAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcgN2gyNnYyNmgtN1YxNGgtNnYxOUg3eiIvPjwvc3ZnPgo=">
        <img style="display:inline-block;margin:0.2em;" alt="npm" src="https://img.shields.io/npm/v/cz-git?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSIjY2IwMDAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcgN2gyNnYyNmgtN1YxNGgtNnYxOUg3eiIvPjwvc3ZnPgo=">
    </a>
    <a href="https://www.npmjs.com/package/czg">
        <img style="display:inline-block;margin:0.2em;" alt="npm-download" src="https://img.shields.io/npm/dm/czg.svg?color=blue&style=flat-square&label=czg&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6IiBmaWxsPSIjY2IwMDAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcgN2gyNnYyNmgtN1YxNGgtNnYxOUg3eiIvPjwvc3ZnPgo=">
    </a>
    <br/>
    <a href="https://formulae.brew.sh/formula/czg">
        <img style="display:inline-block;margin:0.2em;" alt="homebrew" src="https://img.shields.io/homebrew/v/czg?style=flat-square&logo=homebrew&label=homebrew-czg">
    </a>
</p>

<p align="center">
    <a href="https://github.com/Zhengqbbb/cz-git">GitHub</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbb.sh/guide/">Installation</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbb.sh">Website</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbb.sh/cli/">CLI</a>
    <br/>
    <a href="https://cz-git.qbb.sh/zh/">简体中文文档</a>
</p>

## Introduction

DX first and more engineered, lightweight, customizable, standard output format [Commitizen adapter](https://cz-git.qbb.sh/guide/introduction) and [Git commit CLI](https://cz-git.qbb.sh/cli/).

![demo-gif](https://user-images.githubusercontent.com/40693636/188255006-b9df9837-4678-4085-9395-e2905d7ec7de.gif)

> **What is commitizen**: A Node.js-based `git commit` command-line tool that assists in generating standardized commit messages. <br><br>
> **What is an adapter**: Replace the **interactive** plugin for the commitizen command line tool.

## Feature

- 🤖 **OpenAI support.** Let the AI generate your git commit message.
- 💪 Just to be a **lazy man** !!! Friendly command line tool, Supports **search and selection** on the command line, reducing spelling errors.
- ⚡️ **Lightweight**, **Highly Customizable**, but the output format follows the standard [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- 🔨 [Better for monorepo engineering](https://cz-git.qbb.sh/recipes/#scopes) and **commitlint** project to give relevant verification information to the command line.
- ✅ Support commit with **emoji** ｜ Better linking with [issuePrefix](https://cz-git.qbb.sh/recipes/default-issues.html) **for issue**

[⇒ Why cz-git](https://cz-git.qbb.sh/guide/why.html)

```bash
$ npm i -D cz-git
+ cz-git          (1.9 MB)
added 1 package in 0.582s
```

[⇒ Why czg](https://cz-git.qbb.sh/cli/why.html)
```bash
$ npm i -g czg
+ czg             (1.5 MB)
added 1 package in 0.531s
```

## Projects using cz-git

<table>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/nrwl/nx">
        <img src="https://user-images.githubusercontent.com/40693636/211251507-e45992b8-6e49-44e4-933c-100a68f5ff48.png" alt="Nx logo" width="40"><br>
        <sub>Nx</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/element-plus/element-plus">
        <img src="https://user-images.githubusercontent.com/40693636/172459748-939e3f1b-a694-4c09-b643-e1dce602105c.png" alt="Element Plus logo" width="40"><br>
        <sub>Element Plus</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/vueComponent/ant-design-vue">
        <img src="https://user-images.githubusercontent.com/40693636/175873226-45eebf9c-280f-4201-a3d1-4ab259f5a6ad.png" alt="Ant Design Vue logo" width="40"><br>
        <sub>Ant Design Vue</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/Tencent/tdesign-vue-next">
        <img src="https://user-images.githubusercontent.com/40693636/170830562-38e4c998-9af4-4303-9270-4f14e0942b08.png" alt="TDesign-Vue-Next logo" width="40"><br>
        <sub>TDesign-Vue-Next</sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/vbenjs/vue-vben-admin">
        <img src="https://user-images.githubusercontent.com/40693636/178189964-931a1fc2-92df-4d04-8d0d-b748fc318c0a.png" alt="Vben-Admin logo" width="40"><br>
        <sub>Vben-Admin</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/buqiyuan/vue3-antd-admin">
        <img src="https://user-images.githubusercontent.com/40693636/170830597-31d6f0d7-2c93-491b-a984-7bf21db8f75b.png" alt="Vue3-Antd-Admin logo" width="40"><br>
        <sub>Vue3-Antd-Admin</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/HalseySpicy/Geeker-Admin">
        <img src="https://user-images.githubusercontent.com/40693636/170830842-319d83ce-df67-488d-b08f-818947a5a540.png" alt="Geeker-Admin logo" width="40"><br>
        <sub>Geeker-Admin</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/IDuxFE/idux">
        <img src="https://user-images.githubusercontent.com/40693636/171067486-56f50e23-a40b-4353-9c99-6fef702c9b4b.png" alt="iDux logo" width="40"><br>
        <sub>iDux</sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/vuepress-theme-hope/vuepress-theme-hope">
        <img src="https://user-images.githubusercontent.com/40693636/170830621-45577c1d-6e6e-4916-bb43-15af954d994b.png" alt="Vuepress-Theme-Hope logo" width="40"><br>
        <sub>Vuepress-Theme-Hope</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/Renovamen/vuepress-theme-gungnir">
        <img src="https://user-images.githubusercontent.com/40693636/170830637-0d465b52-6204-4bbd-872f-fb6f27f1ed50.png" alt="Vuepress-Theme-Gungnir logo" width="40"><br>
        <sub>Vuepress-Theme-Gungnir</sub>
      </a>
    </td>
  </tr>
</table>


## Get Started

> 「cz-git & czg」 require Node >=**v12.20**

- `cz-git` + [`Commitizen`](https://github.com/commitizen/cz-cli) [⇒ Get Started](https://cz-git.qbb.sh/guide/)
- `czg` [⇒ Get Started](https://cz-git.qbb.sh/cli/install)

## Configure Template

[⇒ Configure Template](https://cz-git.qbb.sh/config/)

## Options

[⇒ Show Related](https://cz-git.qbb.sh/config/show.html)

[⇒ Engineering Related](https://cz-git.qbb.sh/config/engineer.html)

## Recipes

[⇒ Recipes](https://cz-git.qbb.sh/recipes/)

## FAQ

[⇒ FAQ](https://cz-git.qbb.sh/faq/)

## LICENSE

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> (https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?

<a target="_blank" href="https://packagephobia.com/result?p=cz-git,czg">
  <img src="https://user-images.githubusercontent.com/40693636/252157675-32634902-fc02-4a07-a12c-a07ec5ee5f1a.png" alt="size-overview"><br>
  <sub>https://packagephobia.com/result?p=cz-git,czg</sub>
</a>

