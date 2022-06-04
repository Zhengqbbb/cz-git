import { defineConfig } from "vitepress";
import * as pageConfig from "./configs";

export default defineConfig({
  base: pageConfig.base,
  head: pageConfig.head,
  locales: pageConfig.locales,
  lastUpdated: true,

  markdown: pageConfig.markdownConfig,
  themeConfig: pageConfig.themeConfig
});
