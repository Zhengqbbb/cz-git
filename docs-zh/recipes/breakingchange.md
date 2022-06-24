# markBreakingChangeMode

> 添加 ! 标识，表明该 commit 消息属于重大变更

See: 该规则来自 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples)<br>
E.g:
```text
# Commit message 带有 ! 提示重大变更
feat!: send an email to the customer when a product is shipped

# Commit message 与范围以及 ! 标识提示重大变更
feat(api)!: send an email to the customer when a product is shipped

# Commit message 带有 ! 提示重大变更以及底部说明
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

## 使用配置项: `markBreakingChangeMode`
> 改变 "BREAKINGCHANGE"的提问方式，询问是否需要添加 =="!"== 标识

```js{6}
// .commitlintrc.js

/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    markBreakingChangeMode: true
  }
};
```

示例:
![demo](https://user-images.githubusercontent.com/40693636/174950214-b294413c-b2b4-4e5b-9b8d-38deab9e8485.gif)

## 使用 commitizen CLI + cz-git
可以尝试运行命令自动添加标识:
```bash
break=1 cz
```
示例:
![demo](https://user-images.githubusercontent.com/40693636/174949733-d5cd7f0d-ac81-40e8-8cb9-158737330d7a.gif)

## 使用 cz-git CLI `czg`
可以尝试运行命令自动添加标识:
```bash
czg break
```
示例:

