# defaultIssues

- Obtaining the `Issue Number` automatically, it is a very troublesome thing to repeat the query to fill in the `issue number`.
  - But if the team's branch command rules are standardized (e.g: feature/issue_33)
  - Then we use `Node`'s `execSync` to get the branch name through the command
  - Then process the obtained string
  - Then we use `defaultIssues`
  - When using, we only need to press the <kbd>Enter</kbd> key to output the `Issue Number`, so that we can easily intercept the `Issue Number` to reduce repetitive work.

<!-- Tip -->

We can also combine the `customIssuePrefixsAlign` configuration item to dynamically change the position of the issue prefix option.

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
    customIssuePrefixsAlign: !issue ? "top" : "bottom",
    defaultIssues: !issue ? "" : `#${issue}`
  }
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/156002738-af17087e-2d2b-4a80-a681-d63751282ec8.gif)


::: tip
If `cz-git` detects that `allowCustomIssuePrefixs` and `allowEmptyIssuePrefixs` have very strict rules (both set to false) and the **issuePrefixs selection list has only one item**, it will automatically skip question and output
:::

<br>
<br>
<br>

> Using highly customizable `cz-git` makes committing more convenient and more customary. Welcome to share.
