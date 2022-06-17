# defaultIssues

- 自动获取 `Issue Number`，重复查询填写`issue number` 是一件很麻烦的事情，尤其在 gitee 反人类设计
  - 但是如果规范了团队的分支命令规则(e.g: fix/issue_33)
  - 然后我们利用 `Node` 的 `execSync` 通过命令获取到分支名
  - 再对获取的字符串进行处理
  - 接着我们利用 `defaultIssues`
  - 使用时我们只需要按下 <kbd>回车</kbd> 键就可以输出`Issue Number`,如此一来我们可以很方便截取到 `Issue Number` 减少重复性工作。

==提示:==  我们也可以结合 `customIssuePrefixesAlign` 配置项来动态改变 issue 前缀的选择项位置

```js{5-8,13-14}
// .commitlintrc.js 
const { execSync } = require('child_process');

// @tip: git branch name = feature/issue_33   =>    auto get defaultIssues = #33
 const issue = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .split("_")[1]

/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    customIssuePrefixesAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`
  }
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/162552804-132aab02-4b02-4006-9e41-aeae4f825948.gif)

<br>
<br>
<br>

> 利用可高度可定制的 `cz-git` 让 commit 更方便，更契合习惯，欢迎分享。
