---
title: 配置模板
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# 配置模板
## JavaScript 模板

- `.commitlintrc.js`
- `.commitlintrc.cjs`
- `.commitlintrc.mjs`
- `commitlint.config.js`
- `commitlint.config.cjs`
- `commitlint.config.mjs`

::::: details 点击展开 `commitlint.config.js` 完整 默认 配置模板

:::: code-group
::: code-group-item CommonJS

<<< @/snippets/commitlint.config.cjs{js}

:::
::: code-group-item ESM

<<< @/snippets/commitlint.config.mjs{js}

:::
::: code-group-item CommonJS - (Without TypeHelper Fn)

<<< @/snippets/commitlint.config.without-fn.cjs{js}

:::
::: code-group-item ESM - (Without TypeHelper Fn)

<<< @/snippets/commitlint.config.without-fn.mjs{js}

:::
::::

:::::

---

如果你的项目未使用 commitlint，并想使用其他配置文件，可以选择下列配置项

- `cz.config.js`
- `cz.config.cjs`
- `cz.config.mjs`

::::: details 点击展开 `cz.config.js` 完整 默认 配置模板
:::: code-group
::: code-group-item CommonJS

<<< @/snippets/cz.config.cjs{js}

:::
::: code-group-item ESM

<<< @/snippets/cz.config.mjs{js}

:::
::: code-group-item CommonJS - (Without TypeHelper Fn)

<<< @/snippets/cz.config.without-fn.cjs{js}

:::
::: code-group-item ESM - (Without TypeHelper Fn)

<<< @/snippets/cz.config.without-fn.mjs{js}

:::
::::

:::::



==提示:== 你也可以在 package.json 中自定义配置文件路径

```json{8}
{
  "scripts": {
    "commit": "git-cz"
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git",
      "czConfig": "./config/cz.config.js"
    }
  }
}
```

## 中英文对照模板

::: details 点击展开 `commitlint.config.js` 完整 中英文 配置模板

<<< @/snippets/commitlint.config.cn-en.js{js}

:::

## 纯汉化模板

::: warning
不推荐使用纯中文进行commit，因为终端对于中文输入的支持并不是很友好，并且在使用搜索时没有英文交互来得自然。<br>
[推荐使用中英文对照](#中英文对照模板)，可以很好给予团队的新人帮助。
:::

::: details 点击展开 `commitlint.config.js` 完整 纯汉化 配置模板

<<< @/snippets/commitlint.config.cn.js{js}

:::

## Emoji 模板

::: details 点击展开 `commitlint.config.js` 完整 emoji 配置模板

<<< @/snippets/commitlint.config.emoji.js{24-34,36 js}

:::

## JSON 模板

- `.czrc`
- `.commitlintrc`
- `.commitlintrc.json`
- 在 `package.json`中添加 `config.commitizen` 字段
- 在 `package.json`中添加 `commitlint` 字段

<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const v = site.value.themeConfig.nav?.[4]?.text
</script>

::: tip
- JSON $schema URL (只支持 .czrc|指定的 czConfig JSON 配置):

```-vue
https://raw.githubusercontent.com/Zhengqbbb/cz-git/refs/tags/{{ v }}/docs/public/schema/cz-git.json
```

- 推荐在 **项目** 中使用JavaScript进行配置文件，你可以结合 `fs` 和 `path` 为生成动态模块选择[范围](/zh/recipes/#scopes)
:::

::::: details 点击展开 `JSON` 配置模板
:::: code-group
::: code-group-item .czrc
<<< @/snippets/.czrc{json-vue}
:::
::: code-group-item .commitlintrc
<<< @/snippets/.commitlintrc{json}
:::
::::
:::::

## TypeScript 模板

- 从 `cz-git`, `czg` 的 `v1.11.0` 版本开始
- 将使用 Node.js LTS 版本 >= `v22.11.0` 的==实验性功能==, **原生加载 TypeScript 配置文件**<br>==需注入开启实验性的参数== `NODE_OPTIONS='--experimental-transform-types --disable-warning ExperimentalWarning'` 使用
- 详情: [可查看 Node.js 文档](https://nodejs.org/api/cli.html#--experimental-transform-types) ｜ [Node.js TypeScript 支持路线图](https://github.com/nodejs/loaders/issues/217)
- ==建议==: 可先使用 [ESM js](#javascript-%E6%A8%A1%E6%9D%BF) 配置文件作为未来 TypeScript 配置文件的过渡，待 Node.js 运行 TypeScript 稳定后，再进行切换

::::: details 点击展开 `NODE_OPTIONS` 注入方式
:::: code-group
::: code-group-item 项目 package.json 脚本注入 - 配合包 cross-env
```diff
"scripts": {
-    "cz": "czg"
+    "cz": "cross-env NODE_OPTIONS='--experimental-transform-types --disable-warning ExperimentalWarning' czg"
}
```
:::
::: code-group-item 全局注入 - 使用 alias 命令
```sh
# .zshrc | .bashrc
alias czg="NODE_OPTIONS='--experimental-transform-types --disable-warning ExperimentalWarning' \czg"
```
:::
::: code-group-item 全局注入 - 使用 export 命令
```sh
# .zshrc | .bashrc
export NODE_OPTIONS="--experimental-transform-types --disable-warning ExperimentalWarning"
```
:::
::::
:::::

---

- `.commitlintrc.ts`
- `.commitlintrc.mts`
- `.commitlintrc.cts`
- `commitlint.config.ts`
- `commitlint.config.mts`
- `commitlint.config.cts`

::::: details 点击展开 `commitlint.config.ts` 完整 默认 配置模板

:::: code-group
::: code-group-item CommonJS

<<< @/snippets/commitlint.config.cjs{ts}

:::
::: code-group-item ESM

<<< @/snippets/commitlint.config.mjs{ts}

:::
::::

:::::

---

- `cz.config.ts`
- `cz.config.mts`
- `cz.config.cts`

::::: details 点击展开 `cz.config.ts` 完整 默认 配置模板
:::: code-group
::: code-group-item CommonJS

<<< @/snippets/cz.config.cjs{ts}

:::
::: code-group-item ESM

<<< @/snippets/cz.config.mjs{ts}

:::
::::

:::::
