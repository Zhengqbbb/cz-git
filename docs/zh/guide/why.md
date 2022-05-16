---
title: 动机
sidebarDepth: 1
lastUpdated: true
---

# 为什么是 cz-git

#### 为什么做了这款插件

[cz-git 友好型 commitizen 的适配器，我的开发的心路历程](https://www.qbenben.com/post/2022/02/27/cz-git/)

---

- [**cz-customizable**](https://github.com/leoforfree/cz-customizable) :
  1. 需要额外添加配置文件。
  2. 仅支持上下选择是的交互方式。
  3. 可支持的习惯型配置项少。

---

- [**cz-conventional-changelog**](https://github.com/commitizen/cz-conventional-changelog) :
  1. 支持的自定义配置项少。
  2. 交互方式不友好。
  3. 重复性输入的东西太多。

```sh{4}
$ npm i -D cz-conventional-changelog
added 147 packages in 21s
$ npm install -D cz-git
added 1 package in 0.67s
```

---

- [**git-cz**](https://github.com/streamich/git-cz) :
  1. 可支持的自定义配置项少。
  2. 需要额外添加配置文件。

```sh{3}
$ du -sh node_modules/*
148M	node_modules/git-cz
5.6M	node_modules/cz-git
```
