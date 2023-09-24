# defaultSubject
> Suitable for `defaultBody, defaultFooterPrefix, defaultIssues`

- **Initialize the completion template**, you can use <kbd>Tab</kbd> or <kbd>→</kbd> to quickly complete; you can also use the <kbd> Enter</kbd> output template directly. <br> (**detailed categories, provides prefix template, and directly output template**...)
  - E.g [Element-Plus](https://github.com/element-plus/element-plus)，which is a Vue3 component library，The Commit of the component modified is strict
  ```properties
  # https://element-plus.org/en-US/guide/commit-examples.html
  [type](scope): [messages]
  # e.g:
  feat(components): [button] I did something with button
  ```
  - We can get the component name through `git status` information
  - Then pass it to defaultSubject, so that you can quickly use template. <br>Reducing duplicate input and spelling errors

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

![demo-gif](https://user-images.githubusercontent.com/40693636/173278720-d93f17ec-ef98-4706-8dec-101d5b68bf08.gif) <!-- size=720x265 -->


<br>
<br>
<br>

> Using highly customizable `cz-git` makes committing more convenient and more customary. Welcome to share.
