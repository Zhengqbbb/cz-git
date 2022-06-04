import type { DefaultTheme } from "vitepress";
import { github } from "../meta";

/**
 * Theme configs let you customize your theme.
 * @see https://vitepress.vuejs.org/config/theme-configs.html
 */
export const themeConfig: DefaultTheme.Config = {
  logo: "/images/logo.png",
  socialLinks: [{ icon: "github", link: github }],
  editLink: {
    repo: "Zhengqbbb/cz-git",
    branch: "main",
    dir: "docs",
    text: "Suggest changes to this page"
  },
  localeLinks: {
    text: "English",
    items: [{ text: "简体中文", link: "/zh/" }]
  }
};
