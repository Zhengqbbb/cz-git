import type { DefaultThemeOptions, HeadConfig, SiteLocaleConfig } from "vuepress";
import type { MarkdownOptions } from "@vuepress/markdown";
import * as navbar from "./navbar";
import * as sidebar from "./sidebar";

const isProd = process.env.NODE_ENV === "production";

export const base = "/";

export const locales: SiteLocaleConfig = {
  "/": {
    lang: "en-US",
    title: "cz-git",
    description:
      "A more engineered, lightweight, customizable, standard output format commitizen adapter."
  },
  "/zh/": {
    lang: "zh-CN",
    title: "cz-git",
    description: "一款工程性更强，轻量级，高度自定义，标准输出格式的 commitizen 适配器"
  }
};

/* eslint-disable prettier/prettier */
/* prettier-ignore */
export const headConfig: HeadConfig[] = [
  ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" }],
  ["meta", { name: "keywords", content: "cz-git,commitizen,commitizen adapter,git-cz,commitizen-adapter" }],
  ["meta", { name: "google-site-verification", content: "bmaXCuUg4k9-nZLe3yIz1yQb0WO4_h8wHhkhBOl3Dec" }],
  ["meta", { name: "baidu-site-verification", content: "code-rzEqiivgqt" }],
  ["meta", { name: "twitter:title", content: "cz-git - commitizen adapter" }],
  ["meta", { name: "twitter:description", content: "A more engineered, lightweight, customizable, standard output format commitizen adapter." }],
  ["meta", { name: "twitter:creator", content: "@zhengqbbb" }],
  ["meta", { name: "twitter:site", content: "@zhengqbbb" }],
  ["meta", { name: "twitter:card", content: "summary_large_image" }],
  ["meta", { name: "twitter:image", content: "https://cz-git.qbenben.com/images/logo.png" }],
  ["meta", { name: "twitter:image:alt", content: "cz-git-logo" }],
  ["meta", { name: "og:title", content: "cz-git - commitizen adapter" }],
  ["meta", { name: "og:description", content: "A more engineered, lightweight, customizable, standard output format commitizen adapter." }],
  ["meta", { name: "og:url", content: "https://cz-git.qbenben.com/" }],
  ["meta", { name: "og:type", content: "article" }],
  ["meta", { name: "og:locale", content: "en_US" }],
  ["meta", { name: "og:image", content: "https://cz-git.qbenben.com/images/logo.png" }],
  ["meta", { name: "og:image:alt", content: "cz-git-logo" }],
  ["meta", { name: "application-name", content: "cz-git" }],
  ["meta", { name: "apple-mobile-web-app-title", content: "cz-git" }],
  ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
  ["meta", { name: "msapplication-TileColor", content: "#dd6954" }],
  ["meta", { name: "msapplication-TileImage", content: `/images/icons/favicon-192.png` }],
  ["meta", { name: "theme-color", content: "#dd6954" }],

  ["link", { rel: "canonical", href:"https://cz-git.qbenben.com/" }],
  ["link", { rel: "alternate", href:"https://cz-git.qbenben.com/", hreflang:"x-default" }],
  ["link", { rel: "alternate", href:"https://cz-git.qbenben.com/", hreflang:"en-us" }],
  ["link", { rel: "alternate", href:"https://cz-git.qbenben.com/zh/", hreflang:"zh-hans" }],
  ["link", { rel: "shortcut icon", href: `/images/favicon.ico` }],
  ["link", { rel: "icon", type: "image/x-icon", size: "16x16 32x32", href: `/images/favicon.ico` }],
  ["link", { rel: "apple-touch-icon", href: `/images/icons/apple-touch-icon.png` }],
  ["link", { rel: "apple-touch-icon", sizes: "152x152", href: `/images/icons/favicon-152-precomposed.png` }],
  ["link", { rel: "apple-touch-icon", sizes: "144x144", href: `/images/icons/favicon-144-precomposed.png` }],
  ["link", { rel: "apple-touch-icon", sizes: "120x120", href: `/images/icons/favicon-120-precomposed.png` }],
  ["link", { rel: "apple-touch-icon", sizes: "114x114", href: `/images/icons/favicon-114-precomposed.png` }],
  ["link", { rel: "apple-touch-icon", sizes: "180x180", href: `/images/icons/favicon-180-precomposed.png` }],
  ["link", { rel: "apple-touch-icon", sizes: "72x72", href: `/images/icons/favicon-72-precomposed.png` }],
  ["link", { rel: "apple-touch-icon", sizes: "57x57", href: `/images/icons/favicon-57-precomposed.png` }],
  ["link", { rel: "icon", sizes: "32x32", href: `/images/icons/favicon-32.png` }],
  ["link", { rel: "icon", sizes: "192x192", href: `/images/icons/favicon-192.png` }],
  ["link", { rel: "mask-icon", href: "/images/icons/safari-pinned-tab.svg", color: "#dd6954" }],

  ["link", { rel: "manifest", href: "/manifest.webmanifest" }]
];

export const themeConfig: DefaultThemeOptions = {
  logo: "/images/logo.png",
  sidebarDepth: 1,
  repo: "Zhengqbbb/cz-git",
  docsDir: "docs",
  docsBranch: "main",

  backToHome: "$ cd $HOME",
  locales: {
    "/": {
      navbar: navbar.en,
      sidebar: sidebar.en,
      editLinkText: "Edit this page on GitHub"
    },
    "/zh/": {
      // navbar
      navbar: navbar.zh,
      selectLanguageName: "简体中文",
      selectLanguageText: "选择语言",
      selectLanguageAriaLabel: "选择语言",

      // sidebar
      sidebar: sidebar.zh,

      // page meta
      editLinkText: "在 GitHub 上编辑此页",
      lastUpdatedText: "上次更新",
      contributorsText: "贡献者",

      // custom containers
      tip: "提示",
      warning: "注意",
      danger: "警告",

      // 404 page
      notFound: [
        "这里什么都没有",
        "我们怎么到这来了？",
        "这是一个 404 页面",
        "看起来我们进入了错误的链接"
      ],

      // a11y
      openInNewWindow: "在新窗口打开",
      toggleColorMode: "切换夜间模式",
      toggleSidebar: "切换侧边栏"
    }
  },
  themePlugins: {
    git: isProd
  }
};

export const markdownConfig: MarkdownOptions = {
  code: {
    lineNumbers: false
  }
};
