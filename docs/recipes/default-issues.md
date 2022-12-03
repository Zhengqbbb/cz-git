# defaultIssues

- Obtaining the `Issue Number` automatically, it is a very troublesome thing to repeat the query to fill in the `issue number`.
  - But if the team's branch command rules are standardized (e.g: feature/issue_33)
  - Then we use `Node`'s `execSync` to get the branch name through the command
  - Then process the obtained string
  - Then we use `defaultIssues`
  - When using, we only need to press the <kbd>Enter</kbd> key to output the `Issue Number`, so that we can easily intercept the `Issue Number` to reduce repetitive work.


==Tip:== We can also combine the `customIssuePrefixAlign` configuration item to dynamically change the position of the issue prefix option.

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
    customIssuePrefixAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`
  }
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/162552804-132aab02-4b02-4006-9e41-aeae4f825948.gif) <!-- size=688x265 -->


::: tip
If `cz-git` detects that `allowCustomIssuePrefix` and `allowEmptyIssuePrefix` have very strict rules (both set to false) and the **issuePrefixes selection list has only one item**, it will automatically skip question and output
:::

<br>
<br>
<br>

> Using highly customizable `cz-git` makes committing more convenient and more customary. Welcome to share.
