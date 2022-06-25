# Getting Started

## As global use
> ==Recommend:== Compared with the npm or npx startup method, Node can be started more directly once, that you to use the `czg` CLI in any project at a faster speed

```sh
npm install -g czg
# check the installation is successful
czg --help
```

## As a dev dependency use

:::: code-group
::: code-group-item NPM

```bash
npm install -D czg
```

:::
::: code-group-item YARN

```bash
yarn add -D czg
```

:::
::: code-group-item PNPM

```bash
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

```bash
npx czg
```
