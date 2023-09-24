# czg --alias

![demo-gif](https://user-images.githubusercontent.com/40693636/176847992-23cbc56c-5487-4679-a84a-b4fe38a32b34.gif) <!-- size=720x262 -->

## Synopsis

**`czg :, --alias`** - Directly submit the defined commit message

## Description

[alias](/config/engineer.html#alias) is used to define some common git commit messages. We may encounter commit messages that are often output, such as `docs: fix typos`. we define it as alias `fd`.

```sh
czg :fd
# or
czg --alias=fd
```
