---
title: 显示相关
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# 配置 - 显示相关

## messages

- **描述** : 自定义命令行提问信息
- **例子** : <br>`messages: { type: "type: "选择你的提交类型:" }`

## themeColorCode

- **描述** : set prompt inquirer theme color
- **类型** : `string`
- **默认** : `""`  (⇒ cyan 青色)
- **规则**: `38;5;${color_code}`    
  ⇒ `color_code` 可以通过链接查看获取 [https://github.com/sindresorhus/xterm-colors](https://github.com/sindresorhus/xterm-colors)
- **例子**: `"38;5;043"`

:::tip
---
#### 使用 256 Color
- **规则**: `"38;5;${color_code: 0 ~ 255}"`    
  ⇒ `color_code` 可以通过链接查看获取 [https://github.com/sindresorhus/xterm-colors](https://github.com/sindresorhus/xterm-colors)
- **示例**: `"38;5;043"`

#### 使用 256 RGB Color
> 不推荐使用在团队项目中使用，兼容性较差
- **规则**: `"38;2;${R};${G};${B}"`       
  ⇒ 你可以查看这个链接，如果你的终端是否支持显示 256 RGB Truecolor: [https://github.com/termstandard/colors](https://github.com/termstandard/colors#truecolor-support-in-output-devices)
- **示例**: `"38;2;255;100;0"`

---

如果你不想要采用配置记录的主题色，可以在`~/.bashrc` 或者 `~/.zshrc` 等profile文件中添加一行，其优先级会更高:

```bash
export ___X_CMD_THEME_COLOR_CODE="38;5;043"
```
:::

## types

- **描述** : 自定义选择**类型**提示
- **类型** : `Array<{ name: string; value: string; emoji?: string }>`
- **例子** : <br>`types: [{value: 'feat',     name: 'feat:     新增功能 | A new feature', emoji: ':sparkles:'}]`

:::tip
如果要使用 Emoji 需要 ==开启== `userEmoji` 配置项。<br>
==并且需添加 Emoji Code==，可以在: [https://gitmoji.dev/](https://gitmoji.dev/) 或 [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) 查找相应的字符进行补充到 `emoji`。
:::

## typesAppend

- **描述** : 在默认 types 的基础上，添加额外的 types
- **类型** : `Array<{ name: string; value: string; emoji?: string }>`
- **使用** : **只想额外添加少量types**，不想添加臃肿的默认配置，或改变默认配置的显示顺序时使用。
- **默认** : `[]`
- **例子** : <br>
```js
typesAppend: [ 
  { value: "workflow", name: "workflow:  Workflow changes"},
  { value: "*!",       name: "*!:        BREAKING CHANGES"}
]
```

## useEmoji

- **描述** : 是否开启 commit message 带有 Emoji 字符。
- **类型** : `boolean`
- **默认** : `false`

:::tip
尝试运行命令 **可在当前会话直接开启输出 emoji 模式**
- 使用 Commitizen CLI: `emoji=1 cz`
- 使用 cz-git CLI: `czg emoji`
:::

## emojiAlign

- **描述** : 设置 **Emoji 字符** 的 **位于头部位置**
- **类型** : `"left" | "center" | "right"`
- **默认** : `"center"`
- **示例** : `<left> type(scope): <center> subject <right>`

## customScopesAlign

- **描述** : 设置 **选择范围** 中 为空选项(empty) 和 自定义选项(custom) 的 **位置**
- **类型** : `"top" | "bottom" | "top-bottom" | "bottom-top"`
- **默认** : `"bottom"`

## customScopesAlias

- **描述** : 自定义 **选择范围** 中 自定义选项(custom) 在命令行中显示的 **名称**
- **类型** : `string`
- **默认** : `custom`

## emptyScopesAlias

- **描述** : 自定义 **选择范围** 中 为空选项(empty) 在命令行中显示的 **名称**
- **类型** : `string`
- **默认** : `empty`

## customIssuePrefixsAlign

- **描述** : 设置 **选择 issue 前缀** 中 跳过选项(skip) 和 自定义选项(custom) 的 **位置**
- **类型** : `"top" | "bottom" | "top-bottom" | "bottom-top"`
- **默认** : `"top"`

## customIssuePrefixsAlias

- **描述** : 自定义 **选择 issue 前缀** 中 自定义选项(custom) 在命令行中显示的 **名称**
- **类型** : `string`
- **默认** : `custom`

## emptyIssuePrefixsAlias

- **描述** : 自定义 **选择 issue 前缀** 中 跳过选项(skip) 在命令行中显示的 **名称**
- **类型** : `string`
- **默认** : `skip`

## confirmColorize

- **描述** : 确定提交中模板 commit message 是否着色
- **类型** : `boolean`
- **默认** : `true`

---

<br/>
<br/>
<br/>

:::tip
使用==默认值==可以产生很多种玩法让工具更契合你或团队的习惯，可查看小窍门
:::

## defaultType

- **描述** : 如果 defaultType 与在选择范围列表项中的 value 相匹配就会进行星标置顶操作。
- **类型** : `string`
- **默认** : `""`

## defaultScope

- **描述** : 如果 defaultScope 与在选择范围列表项中的 value 相匹配就会进行星标置顶操作。
- **类型** : `string`
- **默认** : `""`
- **额外** : 在 **自定义范围** 中是否使用显示默认值 

==提示== [⇒ 查看小窍门](/zh/recipes/defaultScope.html) 

## defaultSubject

- **描述** : 在 **简短描述** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : **初始化补全模板**，可使用 <kbd>Tab</kbd> 或者 <kbd>→</kbd> 进行快速补全；亦可直接使用 <kbd>Enter</kbd> 输出模板。

==提示== [⇒ 查看小窍门](/zh/recipes/defaultScope.html) 

## defaultBody

- **描述** : 在 **详细描述** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : **初始化补全模板**，可使用 <kbd>Tab</kbd> 或者 <kbd>→</kbd> 进行快速补全；亦可直接使用 <kbd>Enter</kbd> 输出模板。

## defaultFooterPrefix

- **描述** : 在 **自定义ISSUE前缀** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : **初始化补全模板**，可使用 <kbd>Tab</kbd> 或者 <kbd>→</kbd> 进行快速补全；亦可直接使用 <kbd>Enter</kbd> 输出模板。

## defaultIssues

- **描述** : 在 **输入ISSUE** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : **初始化补全模板**，可使用 <kbd>Tab</kbd> 或者 <kbd>→</kbd> 进行快速补全；亦可直接使用 <kbd>Enter</kbd> 输出模板。

==提示== [⇒ 查看小窍门](/zh/recipes/defaultIssues.html) 
