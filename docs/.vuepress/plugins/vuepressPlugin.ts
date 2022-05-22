import { path } from "@vuepress/utils";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { pwaPlugin } from "@vuepress/plugin-pwa";
import { pwaPopupPlugin } from "@vuepress/plugin-pwa-popup";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";

/**
 * @description: Register Components
 */
export const genComponentPlugin = registerComponentsPlugin({
  components: {
    FeatureEN: path.resolve(__dirname, "../components/FeatureEN.vue"),
    FeatureCN: path.resolve(__dirname, "../components/FeatureCN.vue")
  }
});

/**
 * @description: Vuepress Document Search Plugin
 */
export const algoliaSearchPlugin = docsearchPlugin({
  apiKey: "bf9a47e8561e6b8ffdda0bf8595a2f5d",
  indexName: "cz-git",
  appId: "QC8EFXZNC3",
  locales: {
    "/zh/": {
      placeholder: "搜索文档",
      translations: {
        button: {
          buttonText: "搜索文档",
          buttonAriaLabel: "搜索文档"
        },
        modal: {
          searchBox: {
            resetButtonTitle: "清除查询条件",
            resetButtonAriaLabel: "清除查询条件",
            cancelButtonText: "取消",
            cancelButtonAriaLabel: "取消"
          },
          startScreen: {
            recentSearchesTitle: "搜索历史",
            noRecentSearchesText: "没有搜索历史",
            saveRecentSearchButtonTitle: "保存至搜索历史",
            removeRecentSearchButtonTitle: "从搜索历史中移除",
            favoriteSearchesTitle: "收藏",
            removeFavoriteSearchButtonTitle: "从收藏中移除"
          },
          errorScreen: {
            titleText: "无法获取结果",
            helpText: "你可能需要检查你的网络连接"
          },
          footer: {
            selectText: "选择",
            navigateText: "切换",
            closeText: "关闭",
            searchByText: "搜索提供者"
          },
          noResultsScreen: {
            noResultsText: "无法找到相关结果",
            suggestedQueryText: "你可以尝试查询",
            reportMissingResultsText: "你认为该查询应该有结果？",
            reportMissingResultsLinkText: "点击反馈"
          }
        }
      }
    }
  }
});

/**
 * @description: PWA Plugin
 */
export const genPwaPlugin = pwaPlugin({
  skipWaiting: false
});

/**
 * @description: PWA Popup Plugin
 */
export const genPwaPopupPlugin = pwaPopupPlugin({
  locales: {
    "/": {
      message: "New content is available.",
      buttonText: "Refresh"
    },
    "/zh/": {
      message: "文档有新内容，已准备就绪",
      buttonText: "刷新"
    }
  }
});

/**
 * @description: Google Analytics Plugin
 */
export const googleSEOPlugin = googleAnalyticsPlugin({
  id: "G-K6F2G4G0ZN"
});

/**
 * @description: Vuepress Search Plugin
 */
// export const vuepressSearchPlugin: PluginConfig = [
//   "@vuepress/plugin-search",
//   {
//     // 排除首页
//     isSearchable: (page: Page) => page.path !== "/",
//     locales: {
//       "/": {
//         placeholder: "搜索"
//       }
//     }
//   }
// ];
