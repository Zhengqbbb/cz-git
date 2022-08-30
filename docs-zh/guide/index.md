---
title: 快速开始
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.8
---

# 使用

## 项目中使用

> 只需要简单的三个步骤:

::: tip
[全局安装](#全局使用) `commitizen`,如此一来可以快速使用 `cz` 或 `git cz` 命令进行启动。

```sh
npm install -g commitizen
```

:::

#### 步骤 1: 下载依赖

:::: code-group
::: code-group-item NPM

```sh
npm install -D cz-git
```

:::
::: code-group-item YARN

```sh
yarn add -D cz-git
```

:::
::: code-group-item PNPM

```sh
pnpm install -D cz-git
```

:::
::::

#### 步骤 2: 修改 `package.json` 添加 `config` 指定使用的适配器

```json{5-9}
{
  "scripts": {

  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

#### 步骤 3: 添加自定义配置(可选，使用默认)

> 有==两种==配置方式

**方式一: (推荐) cz-git 与 [commitlint](https://github.com/conventional-changelog/commitlint) 进行联动给予校验信息**，所以可以编写于 [commitlint](https://github.com/conventional-changelog/commitlint#config) 配置文件之中。<br>例如: ([⇒ 配置模板](/config/))

```js{2,7,8,9,10}
// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  rule: {
    ...
  },
  prompt: {
    useEmoji: true
    //option...
  }
}
```

**方式二:** 在 **package.json** 下 config.commitizen 下添加自定义配置，但过量的配置项会导致 package.json 臃肿，适合简单自定义。例如:

```json{8}
{
  "scripts": {
    "commit": "git cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git",
      "useEmoji": true
    }
  }
}
```

## 全局使用

> 全局安装的好处在于：在任何项目下都可以利用 `cz` 或 `git cz` 命令启动命令行工具，生成标准化 commit message

只需要简单的三个步骤：

#### 步骤 1: 下载全局依赖

```sh
npm install -g cz-git commitizen
```

#### 步骤 2: 全局配置适配器类型

```sh
echo '{ "path": "cz-git" }' > ~/.czrc
```

#### 步骤 3: 添加自定义配置(可选，使用默认配置)
>  有 ==两种== 配置方式
<br>

**方式一:** 编辑 `~/.czrc` 文件以 ==json== 形式添加配置, 例如:

```json{3}
{
  "path": "cz-git",
  "useEmoji": true
}
```

**方式二: 与 [commitlint](https://github.com/conventional-changelog/commitlint) 配合**，在 `$HOME` 路径下创建配置文件 <br>([↓ 配置模板](/config/))
