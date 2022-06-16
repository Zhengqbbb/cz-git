import fg from "fast-glob";
import { promises as fs } from "fs";

export const optimizePages = async (pwa: boolean) => {
  const pages = await fg("./.vitepress/dist/**/*.html", { onlyFiles: true });

  await Promise.all(
    pages.map(async (page) => {
      let html = await fs.readFile(page, "utf8");

      const prefetchImg = '\n\t<link rel="prefetch" href="/images/logo.svg">';

      if (pwa) {
        html = html.replace(
          "</head>",
          `<link rel="prefetch" href="/manifest.webmanifest">${prefetchImg}
\t<link rel="manifest" href="/manifest.webmanifest">\n</head>`
        );
      } else {
        html = html.replace("</head>", `${prefetchImg}\n</head>`);
      }

      await fs.writeFile(page, html, "utf8");
    })
  );
};
