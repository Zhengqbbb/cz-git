import { clipboardPlugin } from "vuepress-plugin-clipboard";
import { searchConsolePlugin } from "vuepress-plugin-china-search-console";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

/**
 * @description: Code Copy Plugin
 */
export const codeCopyPlugin = clipboardPlugin({
  staticIcon: true,
  align: "top",
  delay: 500
});

/**
 * @description: Baidu Analytics | 360,baidu,byteDance Autopush
 */
export const chinaSEOPlugin = searchConsolePlugin({
  baiduId: "da331747a43e6c97f6ebd1e68ed3dcc8",
  autoPush360Switch: false
});

/**
 * @description: sitemap Plugin
 */
export const genSitemapPlugin = sitemapPlugin({
  hostname: "https://cz-git.qbenben.com",
  excludeUrls: ["/404.html"]
});
