# alias

> [alias](/config/engineer.html#alias) is used to define some common git commit messages. We may encounter commit messages that are often output, such as `docs: fix typos`, if we define like:

```json
// .czrc
{
  "alias": {
    "fd": "docs: fix typos",
    "ur": "docs: update README",
    ":": "docs(blog): update posts"
  }
}
```

==Tip== The options default value is `fd`. You try it in any project `npx czg :fd`

## `czg` CLI Usage

```bash
czg :fd
git czg :fd
# or
czg --alias=fd
git czg --alias=fd
```

![demo](https://user-images.githubusercontent.com/40693636/176847992-23cbc56c-5487-4679-a84a-b4fe38a32b34.gif)

## `commitizen` CLI Usage

```bash
cz_alias=fd cz
# or
cz_alias=fd git cz
```

![demo](https://user-images.githubusercontent.com/40693636/176701915-3f57721a-a54b-4e23-8de6-4d205e01ef9f.gif)

::: warning
Use Commitizen CLI like `cz_alias=fd cz`. The proccess can't exit after commit. Because `cz-cli` not listening for Node.js `close` event, cz-git can't handle.
:::
