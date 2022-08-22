---
title: 简介
sidebarDepth: 0
lastUpdated: true
sitemap:
    priority: 0.8
---

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
        <img style="display:inline-block;margin:0.2em;" alt="npm-download" src="https://img.shields.io/npm/dm/cz-git.svg?style=flat-square&logo=npm">
    </a>
    <br/>
</p>

<p align="center">
    <a href="https://github.com/Zhengqbbb/cz-git">Github</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbb.sh/guide/">Installation</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbb.sh">Website</a>
    &nbsp; | &nbsp;
    <a href="https://cz-git.qbb.sh/zh/">简体中文文档</a>
</p>

## 介绍

一款工程性更强，轻量级，高度自定义，标准输出格式的 [commitizen](https://github.com/commitizen/cz-cli) 适配器

![demo-gif](https://user-images.githubusercontent.com/40693636/165576782-a9339182-df7e-4185-aacc-212f62850f36.gif)

> 什么是commitizen：基于Node.js的 `git commit` 命令行工具，辅助生成标准化规范化的 commit message。<br><br>
> 什么是适配器：更换 commitizen 命令行工具的 **交互方式** 插件。

## 特点

- 友好型命令行工具，**“懒字优先”** ！支持在命令行搜索和选择，减少拼写错误。
- **轻量级**，**高度自定义**, 但输出格式遵循标准的 [Angular commit](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) 规范。
- [更好维护 monorepo 工程化项目](/zh/recipes/#scopes) 与 **commitlint** 配合给予命令行的相关校验信息。
- 更好的与issue链接，尤其 [gitee](/zh/recipes/issuePrefixs.html) | ✅ 支持在 commit 中添加 **emoji**。

```bash
$ npm install -D cz-git
+ cz-git          (1.6 MB)
added 1 package in 0.482s
```

[⇒ 为什么是 cz-git](/zh/guide/why.html)

[⇒ 为什么做了这款插件：cz-git 友好型 commitizen 的适配器，我的开发的心路历程](https://www.qbenben.com/post/2022/02/27/cz-git/)

## 使用 cz-git 的项目

<table>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/element-plus/element-plus">
        <img src="https://user-images.githubusercontent.com/40693636/172459748-939e3f1b-a694-4c09-b643-e1dce602105c.png" alt="Element Plus logo" width="40">
        <sub>Element Plus</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/vueComponent/ant-design-vue">
        <img src="https://user-images.githubusercontent.com/40693636/175873226-45eebf9c-280f-4201-a3d1-4ab259f5a6ad.png" alt="Ant Design Vue logo" width="40">
        <sub>Ant Design Vue</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/Tencent/tdesign-vue-next">
        <img src="https://user-images.githubusercontent.com/40693636/170830562-38e4c998-9af4-4303-9270-4f14e0942b08.png" alt="TDesign-Vue-Next logo" width="40">
        <sub>TDesign-Vue-Next</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/IDuxFE/idux">
        <img src="https://user-images.githubusercontent.com/40693636/171067486-56f50e23-a40b-4353-9c99-6fef702c9b4b.png" alt="iDux logo" width="40">
        <sub>iDux</sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/jdf2e/nutui">
        <img src="https://user-images.githubusercontent.com/40693636/176894936-88fc85da-8fd7-4a0f-b641-7268c4759eb1.png" alt="NntUI logo" width="40">
        <sub>NntUI</sub>
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
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/HalseySpicy/Geeker-Admin">
        <img src="https://user-images.githubusercontent.com/40693636/170830842-319d83ce-df67-488d-b08f-818947a5a540.png" alt="Geeker-Admin logo" width="40">
        <sub>Geeker-Admin</sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/vuepress-theme-hope/vuepress-theme-hope">
        <img src="https://user-images.githubusercontent.com/40693636/170830621-45577c1d-6e6e-4916-bb43-15af954d994b.png" alt="Vuepress-Theme-Hope logo" width="40">
        <sub>Vuepress-Theme-Hope</sub>
      </a>
    </td>
    <td align="center" width="200px">
      <a target="_blank" href="https://github.com/Renovamen/vuepress-theme-gungnir">
        <img src="https://user-images.githubusercontent.com/40693636/170830637-0d465b52-6204-4bbd-872f-fb6f27f1ed50.png" alt="Vuepress-Theme-Gungnir logo" width="40">
        <sub>Vuepress-Theme-Gungnir</sub>
      </a>
    </td>
  </tr>
</table>


## 版权

MIT
Copyright (c) 2022-present Qiubin Zheng <zhengqbbb@gmail.com> [https://github.com/Zhengqbbb](https://github.com/Zhengqbbb)

> I just do my best to make thing well, Could you give a [star ⭐](https://github.com/Zhengqbbb/cz-git) to encourage me ?
