# issuePrefixs

国内用户如果使用 Gitee 作为项目管理，那么该工具可以很好 <br>
==利用 commit message改变issue状态== <br>
详情： [Commit 关联Issue](https://gitee.com/help/articles/4141#article-header2) <br>
通过设置任务状态指令，即起issue状态变更的别名，通过选择别名和输入issue号，可以很好的关联管理issue

```js
module.exports = {
  prompt: {
    issuePrefixs: [
      // @see: https://gitee.com/help/articles/4141#article-header2
      { value: "wip", name: "wip:      将任务状态更改为进行中" },
      { value: "finish", name: "finish:   将任务状态更改为待完成" }
    ]
  }
}
```

![demo-gif](https://user-images.githubusercontent.com/40693636/172990760-f762d329-f710-4560-98fa-c8414d17c9f3.gif)

::: tip
如果 `cz-git` 检测到如果 `allowCustomIssuePrefixs` 和 `allowEmptyIssuePrefixs` 具有非常严格规则(都设置为false)并且 **issuePrefixs 选择列表仅有一项时**，会自动跳过问题并输出
:::


<br>
<br>
<br>

> 利用可高度可定制的 `cz-git` 让 commit 更方便，更契合习惯，欢迎分享。
