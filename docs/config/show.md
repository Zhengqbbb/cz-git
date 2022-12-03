---
title: Show Related
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# Options - Show Related

## messages

- **description** : custom command line question information
- **example** : <br>
```json
{
  "messages": {
    "type": "Select the type of change that you're committing:",
    "scope": "Denote the SCOPE of this change (optional):"
    // ...
  }
}
```

## themeColorCode

- **description** : set prompt inquirer theme color
- **type** : `string`
- **default** : `""`  (⇒ cyan color)

:::tip
---
#### Use 256 Color
- **rule**: `"38;5;${color_code: 0 ~ 255}"`    
  ⇒ the `color_code` can get it by [https://github.com/sindresorhus/xterm-colors](https://github.com/sindresorhus/xterm-colors)
- **example**: `"38;5;075"`

#### Use 256 RGB Color
> Not recommended for use in projects, poor compatibility
- **rule**: `"38;2;${R};${G};${B}"`    
  ⇒ You can check this link to see if your terminal supports displaying 256 RGB Color True-Color: [https://github.com/termstandard/colors](https://github.com/termstandard/colors#truecolor-support-in-output-devices)
- **example**: `"38;2;255;100;0"`
---
If you don't want to use the theme color of the configuration record, you can add a line to the profile file such as `~/.bashrc` or `~/.zshrc`, which will have a higher priority:

```sh
export ___X_CMD_THEME_COLOR_CODE="38;5;043"
```
:::

## types

- **description** : custom selection **type** prompt
- **type** : `Array<{ name: string; value: string; emoji?: string }>`
- **example** : <br>`types: [{value: 'feat', name: 'feat: A new feature', emoji: ':sparkles:'}]`

:::tip
If you want to use Emoji, you need ==enable== `userEmoji` configuration item. <br>
And need to add Emoji Code, you can find the corresponding characters in: [https://gitmoji.dev/](https://gitmoji.dev/) or [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) to supplement `emoji`.
:::

## useEmoji

- **description** : Whether to enable commit messages with Emoji characters.
- **type** : `boolean`
- **default** : `false`

:::tip
Try running command to **enable output emoji mode in the current session**
- Commitizen CLI: `emoji=1 cz`
- cz-git CLI: `czg emoji`
:::

## emojiAlign

- **description** : Set the **location** of Emoji in header
- **type** : `"left" | "center" | "right"`
- **default** : `"center"`
- **example**: `<left> type(scope): <center> subject <right>`

## typesAppend

- **description** : Add extra types to default types
- **type** : `Array<{ name: string; value: string; emoji?: string }>`
- **use** : Use when you don't want to add bloated defaults and don't want to adjust the default order in configuration. **Only want to add a little part of types**.
- **default** : `[]`
- **example** : <br>
```json
{
  "typesAppend": [
    { "value": "workflow", "name": "workflow:  Workflow changes" },
    { "value": "*!", "name": "*!:        BREAKING CHANGES" }
  ]
}
```

## typesSearchValue

- **description** : Default types list fuzzy search `value` key. Set `false` will search `name` key.
- **type** : `boolean`
- **default** : `true`

## customScopesAlign

- **description** : Set the **location** of empty option (empty) and custom option (custom) in **selection range**
- **type** : `"top" | "bottom" | "top-bottom" | "bottom-top"`
- **default** : `"bottom"`

## customScopesAlias

- **description** : Customize the **name** displayed on the command line for the custom option (custom) in the **selection range**
- **type** : `string`
- **default** : `custom`

## emptyScopesAlias

- **description** : Customize the **name** displayed on the command line if the empty option (empty) in the **selection range**
- **type** : `string`
- **default** : `empty`

## customIssuePrefixAlign

- **description** : Set the **location** of skip option (skip) and custom option (custom) in **select issue prefix**
- **type** : `"top" | "bottom" | "top-bottom" | "bottom-top"`
- **default** : `"top"`

## customIssuePrefixAlias

- **description** : custom **select the issue prefix** in the custom option (custom) to display the **name** on the command line
- **type** : `string`
- **default** : `custom`

## emptyIssuePrefixAlias

- **description** : Customize the **name** displayed on the command line in the skip option (skip) in the **select issue prefix**
- **type** : `string`
- **default** : `skip`

## confirmColorize

- **description** : Determines whether the template commit message is colored in the commit
- **type** : `boolean`
- **default** : `true`

---

<br/>
<br/>
<br/>

:::tip
Using ==default value== can produce many ways to make the tool more suitable for you or your team's habits, see the recipes.
:::

## defaultType

- **description** : pin type item the top of the types list (match item value)
- **type** : `string`
- **default** : `""`

## defaultScope

- **description** : pin scope item the top of the scope list (match item value) 
- **type** : `string`
- **default** : `""`
- **other** : Initialize the completion template in **custom scope**. you can use <kbd>Tab</kbd> or <kbd>→</kbd> to quickly complete; you can also use the <kbd> Enter</kbd> output template directly.

==Tip== [⇒ see the recipes](/recipes/default-scope.html)


## defaultSubject

- **description** : Whether to use the display default value in the **short description**
- **type** : `string`
- **default** : `""`
- **use** :  **Initialize the completion template**, you can use <kbd>Tab</kbd> or <kbd>→</kbd> to quickly complete; you can also use the <kbd> Enter</kbd> output template directly.

==Tip== [⇒ see the recipes](/recipes/default-subject.html)

## defaultBody

- **description** : Whether to use the display default value in the **detailed description**
- **type** : `string`
- **default** : `""`
- **use** :  **Initialize the completion template**, you can use <kbd>Tab</kbd> or <kbd>→</kbd> to quickly complete; you can also use the <kbd> Enter</kbd> output template directly.

## defaultFooterPrefix

- **description** : Whether to use the display default value in the **custom ISSUE prefix**
- **type** : `string`
- **default** : `""`
- **use** :  **Initialize the completion template**, you can use <kbd>Tab</kbd> or <kbd>→</kbd> to quickly complete; you can also use the <kbd> Enter</kbd> output template directly.

## defaultIssues

- **description** : Whether to use the display default value in the **input ISSUE**
- **type** : `string`
- **default** : `""`
- **use** :  **Initialize the completion template**, you can use <kbd>Tab</kbd> or <kbd>→</kbd> to quickly complete; you can also use the <kbd> Enter</kbd> output template directly.

==Tip== [⇒ see the recipes](/recipes/default-issues.html)
