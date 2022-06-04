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
==并且需添加 Emoji Code==，可以在: [https://gitmoji.dev/](https://gitmoji.dev/) 查找相应的字符进行补充到 `emoji`。
:::

## typesAppend

- **描述** : 在默认 types 的基础上，添加额外的 types
- **类型** : `Array<{ name: string; value: string; emoji?: string }>`
- **使用** : **只想额外添加少量types**，不想添加臃肿的默认配置，或改变默认配置的显示顺序时使用。
- **默认** : `[]`
- **例子** : <br>`typesAppend: [ { value: "workflow", name: "workflow:  Workflow changes"} ],`

## useEmoji

- **描述** : 是否开启 commit message 带有 Emoji 字符。
- **类型** : `boolean`
- **默认** : `false`

:::tip
尝试运行 `emoji=1 cz` **可在当前会话直接开启输出 emoji 模式**
:::

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
使用==默认值==可以产生很多种玩法让工具更契合你或团队的习惯，[⇒ 查看小窍门](/zh/guide/recipes.html#default)
:::

## defaultType

- **描述** : 如果 defaultType 与在选择范围列表项中的 value 相匹配就会进行星标置顶操作。
- **类型** : `string`
- **默认** : `""`

## defaultScope

- **描述** : 在 **自定义范围** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : 当你想要命令行中出现的默认值只需要按下 <kbd>回车</kbd> 键即可输出

<Badge type="tip" text="提示" /> 如果 defaultScope 与在选择范围列表项中的 value 相匹配就会进行星标置顶操作。

## defaultSubject

- **描述** : 在 **简短描述** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : 当你想要命令行中出现的默认值只需要按下 <kbd>回车</kbd> 键即可输出

## defaultBody

- **描述** : 在 **详细描述** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : 当你想要命令行中出现的默认值只需要按下 <kbd>回车</kbd> 键即可输出


## defaultIssues

- **描述** : 在 **输入ISSUE 和 自定义ISSUE前缀** 中是否使用显示默认值
- **类型** : `string`
- **默认** : `""`
- **使用** : 当你想要命令行中出现的默认值只需要按下 <kbd>回车</kbd> 键即可输出
