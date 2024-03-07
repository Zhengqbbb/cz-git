# 快速开始

> 「czg」 需要 Node 版本 >=**v12.20**

## 全局使用
> ==推荐:== 相比 npm 脚本或者 npx 启动方式，Node.js 只需要启动一次，如此你使用 `czg` CLI 可以在任何项目以最快的速度启动

:::: code-group
::: code-group-item NPM

```sh
npm install -g czg
```

:::
::: code-group-item Homebrew

```sh
brew install czg
```

:::
::: code-group-item X-CMD

```sh
# https://cn.x-cmd.com/pkg/czg
# 适配 x-cmd theme 主题色 & 命令原生补全
x env use czg
```

:::
::::

```sh
# 检查下载是否成功
czg --help
git czg -h
```

## 项目中使用

:::: code-group
::: code-group-item NPM

```sh
npm install -D czg
```

:::
::: code-group-item YARN

```sh
yarn add -D czg
```

:::
::: code-group-item PNPM

```sh
pnpm install -D czg
```

:::
::: code-group-item BUN

```sh
bun add -d czg
```

:::
::::

在 package.json 中添加启动脚本
运行命令进行尝试 `npm cz`
```json
{
  "scripts": {
    "cz": "czg"
  }
}
```

## `npx` 使用
> 你可以在任意项目下启动，但是 npx 启动速度会比全局安装慢


:::: code-group
::: code-group-item NPX

```sh
npx czg
```

:::
::: code-group-item BUNX

```sh
bunx czg
```

:::
::::


## 作为 git hooks 使用

:::warning
不推荐这样使用

因为这样会**改变 git commit 命令原有的行为**，失去快速提交的方式 \
像 `git commit -m "chore: ..."` \
但话虽如此，czg 依然支持，因为它可以约束限制你团队的提交行为

:::

示例: husky(.husky/prepare-commit-msg)

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

exec < /dev/tty && npx czg --hook || true
```

==在提交完消息后出现像 vim 的编辑器 ？== [=> 查看 FAQ 解决方案](/zh/faq/#githooks-%E6%A8%A1%E5%BC%8F%E4%B8%8B%E6%89%93%E5%BC%80%E4%BA%86%E5%83%8F-vim-%E7%9A%84%E7%BC%96%E8%BE%91%E5%99%A8)

