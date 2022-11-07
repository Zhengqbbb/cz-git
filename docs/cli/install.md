# Getting Started

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
> You can start the CLI in different environments, but the startup speed will be slower than global install

```sh
npx czg
```

## As git hooks use

:::warning
This is not recommended
- Because it will **change the original behavior of git commit**, so that will lose fast commit methods such as `git commit -m "xxx"`
- And it will eventually open `vi` so that will lose the convenience of using the CLI
:::
Be that as it may czg still support, because it will constrain your team

e.g: husky(.husky/prepare-commit-msg)
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

exec < /dev/tty && npx czg --hook || true
```
