# Getting Started

> 「czg」 requires Node >=**v12.20**

## As global use
> ==Recommend:== Compared with the npm or npx startup method, Node.js can be started more directly once, that you to use the `czg` CLI in any project at a faster speed

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
# https://x-cmd.com/pkg/czg
# Adapt `x-cmd theme` colorizen & command native completion
x env use czg
```

:::
::::

```sh
# check the installation is successful
czg --help
git czg -h
```

## As a dev dependency use

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

Add script in package.json
try it `npm cz`
```json
{
  "scripts": {
    "cz": "czg"
  }
}
```

## As `npx` use
> You can start the CLI in different project, but the `npx` startup speed will be slower than global install

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

## As git hooks use

:::warning
Not recommended usage

This will **alter the original behavior of the git commit command**, losing the ability for quick commits \
like `git commit -m "chore: ..."` \
However, czg still supports it because **it can enforce and restrict your team's commit behavior**
:::


e.g: husky(.husky/prepare-commit-msg)
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

exec < /dev/tty && npx czg --hook || true
```

==Opening a like vim editor after submitting the message ?== [==> See FAQ for solution](/faq/#opening-a-like-vim-editor-in-git-hooks-mode)

