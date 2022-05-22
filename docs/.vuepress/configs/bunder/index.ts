import type { Bundler } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";

const isProd = process.env.NODE_ENV === "production";
export const bundler: Bundler =
  // process.env.DOCS_BUNDLER === "webpack"
  isProd
    ? webpackBundler({
        postcss: {
          postcssOptions: {
            plugins: [require("autoprefixer")]
          }
        }
      })
    : viteBundler({
        viteOptions: {
          css: {
            postcss: {
              plugins: [require("autoprefixer")]
            }
          }
        }
      });
