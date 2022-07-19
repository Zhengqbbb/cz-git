# alias

> [alias](/zh/config/engineer.html#alias) alias是用来定义一些常用的git commit message。我们常常会遇到一些频繁性输出的 commit message。像修改文档错别字 `docs: fix typos`，我们可以定义一个像下面的配置:

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

==提示== 这个配置的默认值正是 `fd`。你可以在任何项目中尝试运行 `npx czg :fd`

## 使用 `czg` CLI

```bash
czg :fd
# 或者
czg --alias=fd
```

![demo](https://user-images.githubusercontent.com/40693636/176847992-23cbc56c-5487-4679-a84a-b4fe38a32b34.gif)

## 使用 `commitizen` CLI

```bash
cz_alias=fd cz
```

![demo](https://user-images.githubusercontent.com/40693636/176701915-3f57721a-a54b-4e23-8de6-4d205e01ef9f.gif)

::: warning
已知问题：使用 Commitizen CLI 像 `cz_alias=fd cz`。commit 成功后会出现进程未退出。是因为 `cz-cli` 没有监听 Node.js `close` 事件，`cz-git` 无法处理。
:::
