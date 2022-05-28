<p align="center">
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
        <img src="https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-17-16-15.png" alt="cz-git-logo" width="400" data-width="400" data-height="400">
    </a>
</p>

<h1 align="center">cz-git</h1>

<p align="center">
    <a target="_blank" href="https://github.com/commitizen/cz-cli#adapters">
      <img style="display:inline-block;margin:0.2em;" alt="Commitizen-Adapter" src="https://img.shields.io/badge/Commitizen-Adapter-red.svg?logo=git&style=flat">
    </a>
    <br/>
    <a target="_blank" href="http://commitizen.github.io/cz-cli/">
      <img style="display:inline-block;margin:0.2em;" alt="commitizen-friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?logo=github">
    </a>
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git">
      <img style="display:inline-block;margin:0.2em;" alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zhengqbbb/cz-git?style=social">
    </a>
    <a target="_blank" href="https://github.com/Zhengqbbb/cz-git/actions/workflows/nodejs.yml">
      <img style="display:inline-block;margin:0.2em;" alt="test-ci" src="https://github.com/Zhengqbbb/cz-git/workflows/Node.js%20CI/badge.svg">
    </a>
    <br>
    <a href="https://www.npmjs.com/package/cz-git">
        <img style="display:inline-block;margin:0.2em;" alt="npm" src="https://img.shields.io/npm/v/cz-git?style=flat-square&logo=npm">
        <img style="display:inline-block;margin:0.2em;" alt="npm-download" src="https://img.shields.io/npm/dt/cz-git.svg?style=flat-square&logo=npm">
    </a>
    <br/>
</p>

<p align="center">
    <a href="https://github.com/Zhengqbbb/cz-git">Github</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbenben.com/guide/getting-started.html">Installation</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbenben.com">Website</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbenben.com/zh/">简体中文文档</a>
</p>

## Introduction

A more engineered, lightweight, customizable, standard output format [commitizen](https://github.com/commitizen/cz-cli) adapter.

![demo-gif](https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-17-20-50.gif)

> **What is commitizen**: A Node.js-based `git commit` command-line tool that assists in generating standardized and standardized commit messages. <br><br>
> **What is an adapter**: Replace the **interactive** plugin for the commitizen command line tool.

## Feature

- Just to be a **lazy man** !!! Friendly command line tool,  Supports **search and selection** on the command line, reducing spelling errors.
- **LightWeight**, **Highly Customizable**, but the output format follows the standard [Angular commit](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) specification.
- [Better for monorepo engineering](https://cz-git.qbenben.com/guide/recipes.html#scopes) and **commitlint** project to give relevant verification information to the command line.
- Better linking with [issuePrefixs](https://cz-git.qbenben.com/guide/recipes.html#defaultissues) **for issue** | ✅ Support **emoji** in commit.

[⇒ Why cz-git](https://cz-git.qbenben.com/guide/why.html)

```bash
$ npm i -D cz-git
+ cz-git          (1.7 MB)
added 1 package in 0.461s
```

## Usage

[⇒ Get Started](https://cz-git.qbenben.com/guide/getting-started.html)

## Configure Template

[⇒ Configure Template](https://cz-git.qbenben.com/guide/configuration.html)

## Options

[⇒ Show Related](https://cz-git.qbenben.com/guide/options-show.html)

[⇒ Engineering Related](https://cz-git.qbenben.com/guide/option-engineer.html)

## Recipes

[⇒ Recipes](https://cz-git.qbenben.com/guide/recipes.html)

## FAQ

[⇒ FAQ](https://cz-git.qbenben.com/guide/faq.html)

## Projects using cz-git

<table>
  <tr>
    <td align="center" style="width: 200px;">
      <a target="_blank" href="https://github.com/Tencent/tdesign-vue-next">
        <img src="https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-17-41-17.png" style="width: 40px;"><br>
        <sub>TDesign-Vue-Next</sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 200px;">
      <a target="_blank" href="https://github.com/buqiyuan/vue3-antd-admin">
        <img src="https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-17-47-26.png" style="width: 40px;"><br>
        <sub>Vue3-Antd-Admin</sub>
      </a>
    </td>
    <td align="center" style="width: 200px;">
      <a target="_blank" href="https://github.com/HalseySpicy/Geeker-Admin">
        <img src="https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-17-49-25.png" style="width: 40px;"><br>
        <sub>Geeker-Admin</sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" style="width: 200px;">
      <a target="_blank" href="https://github.com/vuepress-theme-hope/vuepress-theme-hope">
        <img src="https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-17-52-07.png" style="width: 40px;"><br>
        <sub>vuepress-theme-hope</sub>
      </a>
    </td>
    <td align="center" style="width: 200px;">
      <a target="_blank" href="https://github.com/Renovamen/vuepress-theme-gungnir">
        <img src="https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-18-31-20.png" style="width: 40px;"><br>
        <sub>vuepress-theme-gungnir</sub>
      </a>
    </td>
  </tr>
</table>

## LICENSE

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> (https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?
