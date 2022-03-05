import type { AppOptions, BundlerConfig } from "vuepress";
const isProd = process.env.NODE_ENV === "production";

export const bundler: AppOptions["bundler"] =
  process.env.DOCS_BUNDLER ??
  // use vite in dev, use webpack in prod
  (isProd ? "@vuepress/webpack" : "@vuepress/vite");

export const bundlerConfig: BundlerConfig = {
  postcss: {
    postcssOptions: {
      plugins: [require("autoprefixer")]
    }
  },
  viteOptions: {
    css: {
      postcss: {
        plugins: [require("autoprefixer")]
      }
    }
  }
};
