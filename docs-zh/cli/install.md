# 快速开始

## 全局使用
> ==推荐:== 相比 npm 脚本或者 npx 启动方式，Node.js 只需要启动一次，如此你使用 `czg` CLI 可以在任何项目以最快的速度启动

:::: code-group
::: code-group-item NPM

```sh
npm install -g czg
# 检查下载是否成功
czg --help
git czg -h
```

:::
::: code-group-item Homebrew

```sh
brew install czg
# 检查下载是否成功
czg --help
git czg -h
```

:::
::::

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
> 你可以在其他环境下启动，但是启动速度会比全局安装慢


```sh
npx czg
```


## 作为 git hooks 使用

:::warning
不推荐这样使用
- 因为这样会**改变 git commit 命令原有的行为**，失去快速提交的方式    
  像 `git commit -m "chore: ..."`
- 并且在最后会开启 `vi` 编辑器进行确定，失去使用命令行工具的便利性
:::

但话虽如此，czg 依然支持，因为它可以约束限制你团队的提交行为

示例: husky(.husky/prepare-commit-msg)
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

exec < /dev/tty && npx czg --hook || true
```
