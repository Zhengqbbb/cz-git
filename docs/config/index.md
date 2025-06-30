---
title: Configure Template
sidebarDepth: 2
lastUpdated: true
sitemap:
    priority: 0.6
---

# Configure Template

## JavaScript template

- `.commitlintrc.js`
- `.commitlintrc.cjs`
- `.commitlintrc.mjs`
- `commitlint.config.js`
- `commitlint.config.cjs`
- `commitlint.config.mjs`

::::: details Click to expand `commitlint.config.js` complete default configuration template

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

If your project does not use commitlint,and want to use other profiles. You can use the following configuration items

- `cz.config.js`
- `cz.config.cjs`
- `cz.config.mjs`


::::: details Click to expand `cz.config.js` complete default configuration template
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

==Tip:== You can also optionally custom configuration file path in package.json

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

## Emoji template

::: details Click to expand `commitlint.config.js` complete emoji template template

<<< @/snippets/commitlint.config.emoji.js{24-34,36 js}

:::

## JSON template

- `.czrc`
- `.commitlintrc`
- `.commitlintrc.json`
- `commitlint` field in `package.json`
- `config.commitizen` field in `package.json`

<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const v = site.value.themeConfig.nav?.[4]?.text
</script>

::: tip
- JSON $schema URL (Only support .czrc|or specified czConfig JSON configure):

```-vue
https://raw.githubusercontent.com/Zhengqbbb/cz-git/refs/tags/{{ v }}/docs/public/schema/cz-git.json
```

- It is recommended to use JavaScript for configuration files in the **project**. You can combine `fs` and `path` to select [scopes](/recipes/#scopes) for generating dynamic modules.
:::

::::: details Click to expand `JSON` default configuration template
:::: code-group
::: code-group-item .czrc
<<< @/snippets/.czrc{json-vue}
:::
::: code-group-item .commitlintrc
<<< @/snippets/.commitlintrc{json}
:::
::::
:::::

## TypeScript template

- `cz-git`, `czg` added in `v1.11.0`
- Will use Node.js LTS version >= `v22.11.0` ==experimental feature==, **native TypeScript configuration file loading**<br>==Need injection of experimental options== `NODE_OPTIONS='--experimental-transform-types --disable-warning ExperimentalWarning'` to use
- For details: [see Node.js documentation](https://nodejs.org/api/cli.html#--experimental-transform-types) | [Node.js TypeScript support roadmap](https://github.com/nodejs/loaders/issues/217)
- ==TIP==: You can first use [ESM js](#javascript-template) configuration files as a transition for future TypeScript configuration files, and switch after Node.js runs TypeScript stably

::::: details Click to expand `NODE_OPTIONS` injection methods
:::: code-group
::: code-group-item package.json - with cross-env package
```diff
"scripts": {
-    "cz": "czg"
+    "cz": "cross-env NODE_OPTIONS='--experimental-transform-types --disable-warning ExperimentalWarning' czg"
}
```
:::
::: code-group-item Global - with alias command
```sh
# .zshrc | .bashrc
alias czg="NODE_OPTIONS='--experimental-transform-types --disable-warning ExperimentalWarning' \czg"
```
:::
::: code-group-item Global - with export command
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

::::: details Click to expand `commitlint.config.ts` complete default configuration template

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

::::: details Click to expand `cz.config.ts` complete default configuration template
:::: code-group
::: code-group-item CommonJS

<<< @/snippets/cz.config.cjs{ts}

:::
::: code-group-item ESM

<<< @/snippets/cz.config.mjs{ts}

:::
::::

:::::
