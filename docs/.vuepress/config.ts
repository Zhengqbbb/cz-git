import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import { bunderInfo, pageInfo } from "./configs";
import * as pagePlugins from "./plugins";

export default defineUserConfig<DefaultThemeOptions>({
  base: pageInfo.base,
  locales: pageInfo.locales,
  head: pageInfo.headConfig,

  bundler: bunderInfo.bundler,
  bundlerConfig: bunderInfo.bundlerConfig,

  plugins: [
    pagePlugins.codeCopyPlugin,
    pagePlugins.docSearchPlugin,
    pagePlugins.pwaPlugin,
    pagePlugins.pwaPopupPlugin,
    pagePlugins.registerComponentPlugin,
    pagePlugins.googleAnalyticsPlugin,
    pagePlugins.chinaSEOPlugin,
    pagePlugins.sitemapPlugin
  ],
  themeConfig: pageInfo.themeConfig,
  markdown: pageInfo.markdownConfig,
  extendsMarkdown: (md) => {
    md.use(require("markdown-it-mark"));
  }
});
