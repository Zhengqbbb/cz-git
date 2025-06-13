---
title: Getting Started
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.8
---

# Usage

> 「cz-git」 requires Node >=**v12.20**

## As a dev dependency use

> Just three simple steps:

::: tip
[global installation](#as-global-use) `commitizen`, that you can quickly use the `cz` or `git cz` command to start.

```sh
npm install -g commitizen
```
:::

::::::ol
:::::li Install dependencies
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
:::::

:::::li Modify `package.json` to add `config` Specify the adapter used
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
:::::

:::::li (Optional, use default) Add custom configuration
> 👇 There are ==two== configuration methods
1. (Recommend) cz-git is linked with [commitlint](https://github.com/conventional-changelog/commitlint) to provide verification information, so it can be written in [commitlint](https://github.com/conventional-changelog/commitlint#config) configuration file. <br> E.g: ([⇒ Configuration Template](/config/#configure-template))

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

2. Add custom configuration under config.commitizen under `package.json`, but excessive configuration items will lead to bloated package.json, which is suitable for simple customization. E.g:

```json{8}
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git",
      "useEmoji": true
    }
  }
}
```
:::::

::::::

## As global use
> The advantage of global installation is that you can use `cz` or `git cz` command to start command line tools under any project to generate standardized commit messages

Just three simple steps:

::::ol
:::li Install global dependencies
```sh
npm install -g cz-git commitizen
```
:::

:::li Global configuration adapter type
<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const v = site.value.themeConfig.nav?.[4]?.text.slice(1)
</script>

```sh-vue
echo '{ "path": "cz-git", "$schema": "https://raw.githubusercontent.com/Zhengqbbb/cz-git/refs/tags/{{ v }}/docs/public/schema/cz-git.json" }' > ~/.czrc
```
:::

:::li (Optional, use default) Add custom configuration
> 👇 There are ==two== configuration methods
1. Edit the `~/.czrc` file to add configuration in the form of `JSON`, for example:
```json{3}
{
  "path": "cz-git",
  "useEmoji": true
}
```
2. Cooperate with [commitlint](https://github.com/conventional-changelog/commitlint) to create a configuration file under the path of `$HOME` <br>([↓ Configuration Template](/config/#configure-template))
:::
::::
