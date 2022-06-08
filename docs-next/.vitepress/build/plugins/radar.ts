import ViteRadar from "vite-plugin-radar";

/**
 * FIXME: vitepress can't handle vite transformIndexHtml
 * All in one analytics loader for vite
 * @see https://github.com/stafyniaksacha/vite-plugin-radar
 */
export const radarPlugin = ViteRadar({
  // Google Analytics tag injection
  analytics: {
    id: "G-XXXXX"
  },
  // Baidu tongji(Analytics) tag injection
  tongji: {
    id: "XXXXX"
  }
});
