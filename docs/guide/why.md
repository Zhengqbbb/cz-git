---
title: Why cz-git
sidebarDepth: 1
lastUpdated: true
sitemap:
    priority: 0.6
---

# Why cz-git

<br>

Why developed `cz-git` - article: [「cz-git development journey」](https://www.qbb.sh/posts/2022-12-26-cz-git-czg-journey)

---

- [**cz-customizable**](https://github.com/leoforfree/cz-customizable) :
  1. Adding additional configuration files are needed.
  2. Only supports the upper and lower choices.
  3. There are fewer supportable habitual configuration items.

---

- [**cz-conventional-changelog**](https://github.com/commitizen/cz-conventional-changelog) :
  1. Supported custom configuration items are less.
  2. Interactive method is no friendly.
  3. Too many repetitive input.

```sh{4}
$ npm install -D cz-conventional-changelog
added 147 packages in 21s

$ npm install -D cz-git
added 1 package in 0.482s
```

---

- [**git-cz**](https://github.com/streamich/git-cz) :
  1. Supported custom configuration items are less.
  2. Adding additional configuration files are needed.

```sh{3}
$ du -sh node_modules/*
148 MB	node_modules/git-cz
1.6 MB	node_modules/cz-git
```
