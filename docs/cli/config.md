# czg --config

## Synopsis

**`czg --config=<file path>`** - Specify the configuration file to use

## Description

czg will ==automatically== configure the current project root path or `$HOME` path of the configuration file<br>
But if you need to **specify path** a configuration file, you can use this option

---

e.g: `czg --config="./config/cz.json"`

<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const v = site.value.themeConfig.nav?.[4]?.text.slice(1)
</script>

```json-vue
// config/cz.json
{
  "$schema": "https://cdn.jsdelivr.net/gh/Zhengqbbb/cz-git@{{ v }}/docs/public/schema/cz-git.json",
  "maxSubjectLength": 100
  // configure ...
}
```

e.g `czg --config="./config/cz.js"`

```js
// config/cz.js
const { definePrompt } = require('czg')

module.exports = definePrompt({
  maxSubjectLength: 100
  // configure ...
})
```

:::tip
`czg` supports configuration item. [⇒ see the configuration guide](/config/show)<br>
`czg` default configure. [⇒ see the configuration template](/config/)
:::
