---
title: 简介
sidebarDepth: 0
lastUpdated: true
sitemap:
    priority: 0.8
---

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

## 介绍

一款工程性更强，轻量级，高度自定义，标准输出格式的 [commitizen](https://github.com/commitizen/cz-cli) 适配器

![demo-gif](https://cdn.jsdelivr.net/gh/Zhengqbbb/img/cz/README-2022-05-28-17-24-24.gif)

> 什么是commitizen：基于Node.js的 `git commit` 命令行工具，辅助生成标准化规范化的 commit message。<br><br>
> 什么是适配器：更换 commitizen 命令行工具的 **交互方式** 插件。

## 特点

- 友好型命令行工具，**“懒字优先”** ！支持在命令行搜索和选择，减少拼写错误。
- **轻量级**，**高度自定义**, 但输出格式遵循标准的 [Angular commit](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) 规范。
- [更好维护 monorepo 工程化项目](/zh/guide/recipes.html#scopes) 与 **commitlint** 配合给予命令行的相关校验信息。
- 更好的与issue链接，尤其 [gitee](/zh/guide/recipes.html#issueprefixs) | ✅ 支持在 commit 中添加 **emoji**。

```bash
$ npm install -D cz-git
+ cz-git          (1.7 MB)
added 1 package in 0.461s
```

[⇒ 为什么是 cz-git](/zh/guide/why.html)

[⇒ 为什么做了这款插件：cz-git 友好型 commitizen 的适配器，我的开发的心路历程](https://www.qbenben.com/post/2022/02/27/cz-git/)

## 使用 cz-git 的项目

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


## 版权

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> [https://github.com/Zhengqbbb](https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?
