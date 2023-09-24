# czg --alias

![demo-gif](https://user-images.githubusercontent.com/40693636/176847992-23cbc56c-5487-4679-a84a-b4fe38a32b34.gif) <!-- size=720x262 -->

## 概要

**`czg :, --alias`** - 直接提交已定义别名的 commit message

## 描述

[alias](/zh/config/engineer.html#alias) alias是用来定义一些常用的git commit message。我们常常会遇到一些频繁性输出的 commit message。像修改文档错别字 `docs: fix typos`，此时我们可以将他定义别名 `fd` 进行使用

```sh
czg :fd
# or
czg --alias=fd
```
