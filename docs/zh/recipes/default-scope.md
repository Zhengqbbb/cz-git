# defaultScope

- 自动获取 “代码修改范围”。 适用于存在很多范围选项（例如组件库、monorepo）的情况。
  - 例如 [TDesign-Vue-Next](https://github.com/Tencent/tdesign-vue-next)，这是一个 Vue3 组件库，在 `src` 中存储了超过 60 个组件
  - 但与此同时其项目路径结构十分清晰
  - 我们可以通过`git status`获取已修改文件缓存区的路径
  - 进行字符串匹配截取，获得匹配成功的 `scope`
  - 再传递给 defaultScope，在选择列表中进行置顶

```js{5-11,16,17}
// .commitlint.config.js
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

![demo-gif](https://user-images.githubusercontent.com/40693636/172989830-c3e436ad-adab-42f5-973f-b97f33748939.gif) <!-- size=688x248 -->


<br>
<br>
<br>

> 利用可高度可定制的 `cz-git` 让 commit 更方便，更契合习惯，欢迎分享。
