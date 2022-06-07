import type { MarkdownOptions } from "vitepress";

/**
 * vitepress markdown config
 * @see ...coming soon
 */
export const markdownConfig: MarkdownOptions = {
  /** shiki code theme */
  theme: {
    light: "vitesse-light",
    dark: "vitesse-dark"
  },
  // theme: "one-dark-pro",
  config: (md) => {
    md.use(require("markdown-it-mark"));
  }
};
