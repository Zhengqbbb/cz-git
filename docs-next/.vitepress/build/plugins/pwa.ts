import fg from "fast-glob";
import { promises as fs } from "fs";
import { resolve } from "pathe";
import { VitePWA } from "vite-plugin-pwa";
import type { VitePluginPWAAPI } from "vite-plugin-pwa";
import type { Plugin } from "vite";
import { name, descriptionEN } from "../../meta";

/**
 * FIXME: vitepress will render page in finally, that use it can't work.
 */
const optimizePages = async (pwa: boolean) => {
  const pages = await fg("./.vitepress/dist/**/*.html", { onlyFiles: true });

  await Promise.all(
    pages.map(async (page) => {
      let html = await fs.readFile(page, "utf8");

      const prefetchImg = `
\n\t<link rel="prefetch" href="/images/logo.svg">
      `;

      if (pwa) {
        html = html.replace(
          "</head>",
          `
\t<link rel="prefetch" href="/manifest.webmanifest">${prefetchImg}
\t<link rel="manifest" href="/manifest.webmanifest">\n</head>`
        );
      } else {
        html = html.replace(
          "</head>",
          `
${prefetchImg}
</head>`
        );
      }

      await fs.writeFile(page, html, "utf8");
    })
  );
};

/**
 * Vite Plugin PWA uses Workbox  library to build the service worker
 * can find more information on Workbox section.
 * @see https://vite-plugin-pwa.netlify.app/
 */
export const pwaPlugin = VitePWA({
  outDir: ".vitepress/dist",
  registerType: "autoUpdate",
  // include all static assets under public/
  includeAssets: fg.sync("**/*.{png,svg,ico,txt}", { cwd: resolve(__dirname, "../../../public") }),
  manifest: {
    id: "/",
    name: name,
    short_name: name,
    description: descriptionEN,
    theme_color: "#dd6954",
    icons: [
      {
        src: "/images/icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/images/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/images/logo.svg",
        sizes: "165x165",
        type: "image/svg",
        purpose: "any maskable"
      }
    ]
  },
  workbox: {
    navigateFallbackDenylist: [/^\/new$/],
    runtimeCaching: []
  }
});

/**
 * custom html and pwa cache assets
 */
export const pwaPostPlugin: Plugin = {
  name: "pwa:post",
  enforce: "post",
  async buildEnd() {
    const pwaAPI: VitePluginPWAAPI = pwaPlugin.find((i) => i.name === "vite-plugin-pwa")?.api;
    const pwa = pwaAPI && !pwaAPI.disabled;
    await optimizePages(pwa);
    if (pwa) await pwaAPI.generateSW();
  }
};
