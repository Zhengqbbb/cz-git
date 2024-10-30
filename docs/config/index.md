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

::::: details Click to expand `.commitlintrc.js` complete default configuration template

:::: code-group
::: code-group-item CommonJS

<<< @/snippets/commitlint.config.cjs{js}

:::
::: code-group-item ESM

<<< @/snippets/commitlint.config.mjs{js}

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

::: details Click to expand `.commitlintrc.js` complete emoji template template

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
const v = site.value.themeConfig.nav?.[4]?.text.slice(1)
</script>

::: tip
- JSON $schema URL (Only support .czrc|or specified czConfig JSON configure):

```-vue
https://cdn.jsdelivr.net/gh/Zhengqbbb/cz-git@{{ v }}/docs/public/schema/cz-git.json
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

:::danger
**Since <u>v1.3.0</u>. The typescript configuration file will no longer be loaded**. e.g(`cz.config.ts`)

- Using the TypeScript configuration file will **affects command line tool startup speed**.
- Increase the package size.
:::

:::tip
Using the js configuration file to add the `@type` annotation can be a good way to provide code hints at configuration time.
:::
