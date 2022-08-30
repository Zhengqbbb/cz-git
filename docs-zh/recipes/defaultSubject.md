# defaultSubject
> 适用于 `defaultBody, defaultFooterPrefix, defaultIssues`

- **初始化补全模板**，可使用 <kbd>Tab</kbd> 或者 <kbd>→</kbd> 进行快速补全；亦可直接使用 <kbd>Enter</kbd> 输出模板。<br>适用于**细分类别，提供前置模板信息，直接输出模板**...
  - 例如 [Element-Plus](https://github.com/element-plus/element-plus)，这是一个 Vue3 组件库，其关于组件方面修改的 commit 非常严格
  ```sh
  # https://github.com/element-plus/element-plus/blob/dev/commit-example.md
  [type](scope): [messages]
  # e.g:
  feat(components): [button] I did something with button
  ```
  - 我们可以通过`git status`中的信息进行组件名的字符串匹配提取
  - 再传递给 defaultSubject，如此一来可以快速进行补全，减少重复性输入以及拼写错误

<br>

```js{9-12,17}
// commitlint.config.js
const { execSync } = require('child_process')

const gitStatus = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')

const subjectComplete = gitStatus
  .find((r) => ~r.indexOf('M  packages/components'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%components%%((\w|-)*)/)?.[1]

/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    defaultSubject: subjectComplete && `[${subjectComplete}] `,
  },
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/173278720-d93f17ec-ef98-4706-8dec-101d5b68bf08.gif)


<br>
<br>
<br>

> 利用可高度可定制的 `cz-git` 让 commit 更方便，更契合习惯，欢迎分享。
