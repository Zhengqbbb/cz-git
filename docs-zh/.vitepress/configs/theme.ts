import type { DefaultTheme } from "vitepress";
import * as nav from "./navbar";
import * as sidebar from "./sidebar";
import { github, site } from "../meta";

/**
 * Theme configs let you customize your theme.
 * @see https://vitepress.vuejs.org/config/theme-configs.html
 */
export const themeConfig: DefaultTheme.Config = {
  logo: "https://user-images.githubusercontent.com/40693636/154064210-964aeaa0-d9dc-4cea-9e52-2ffc3789611b.png",
  socialLinks: [{ icon: "github", link: github }],
  editLink: {
    pattern: `${github}/edit/main/docs-zh/:path`,
    text: "在 GitHub 上编辑此页"
  },
  localeLinks: {
    text: "简体中文",
    items: [{ text: "English", link: site }]
  },
  algolia: {
    appId: "QC8EFXZNC3",
    apiKey: "bf9a47e8561e6b8ffdda0bf8595a2f5d",
    indexName: "cz-git",
    searchParameters: {
      facetFilters: ["lang:zh-CN"]
    }
  },
  nav: nav.zh,
  sidebar: sidebar.zh
};
