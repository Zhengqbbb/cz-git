# czg --config

## 概要

**`czg --config=<文件相对路径>`** - 指定使用配置文件

## 描述

czg 会 ==自动== 寻找当前项目根目录以及 `$HOME` 目录下的配置文件。<br>
但如果你需要指向**特殊的配置文件路径**，可以使用此选项

---

示例: `czg --config="./config/cz.json"`

<script setup>
import { useData } from 'vitepress'

const { site } = useData()
const v = site.value.themeConfig.nav?.[4]?.text
</script>

```json-vue
// config/cz.json
{
  "$schema": "https://raw.githubusercontent.com/Zhengqbbb/cz-git/refs/tags/{{ v }}/docs/public/schema/cz-git.json",
  "maxSubjectLength": 100
  // 配置 ...
}
```

示例: `czg --config="./config/cz.js"`

```js
// config/cz.js
const { definePrompt } = require('czg')

module.exports = definePrompt({
  maxSubjectLength: 100
  // 配置 ...
})
```

:::tip
查看 `czg` 支持的配置项，[→ 查看配置项](/zh/config/show)<br>
查看 `czg` 支持的默认配置，[→ 查看配置模版](/zh/config/)
:::
