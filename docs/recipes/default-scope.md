# defaultScope

- Obtaining the `project scope` automatically. Good for when there are a lot of scope options (eg components lib, monorepo).
  - e.g [TDesign-Vue-Next](https://github.com/Tencent/tdesign-vue-next), which is a Vue3 component library with more than 60+ components stored in `src`
  - Fortunately, the path structure is clear
  - We can get the path of the modified file cache through `git status`
  - Perform string matching interception to obtain scope
  - passed to defaultScope. pin the top of scope list

```js{5-11,16,17}
// commitlint.config.js
const { execSync } = require('child_process');

// precomputed scope
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1];

/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top-bottom' : 'bottom',
  },
};
```

![demo-gif](https://user-images.githubusercontent.com/40693636/172989830-c3e436ad-adab-42f5-973f-b97f33748939.gif) <!-- size=720x248 -->

<br>
<br>
<br>

> Using highly customizable `cz-git` makes committing more convenient and more customary. Welcome to share.
