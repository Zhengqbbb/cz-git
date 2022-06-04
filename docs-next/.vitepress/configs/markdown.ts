import type { MarkdownOptions } from "vitepress";

/**
 * vitepress markdown config
 * @see ...coming soon
 */
export const markdownConfig: MarkdownOptions = {
  theme: {
    light: "vitesse-light",
    dark: "vitesse-dark"
  },
  config: (md) => {
    md.use(require("markdown-it-mark"));
  }
};
