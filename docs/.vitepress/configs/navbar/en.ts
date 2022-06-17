import type { DefaultTheme } from "vitepress";
import { version, github, npm } from "../../meta";

export const en: DefaultTheme.NavItem[] = [
  {
    text: "Guide",
    link: "/guide/",
    activeMatch: "/guide/"
  },
  {
    text: "Config",
    link: "/config/",
    activeMatch: "/config/"
  },
  {
    text: "Recipes",
    link: "/recipes/",
    activeMatch: "/recipes/"
  },
  {
    text: `v${version}`,
    items: [
      {
        text: "Changelog",
        link: github + "/blob/main/CHANGELOG.md"
      },
      {
        text: "NPM",
        link: npm
      },
      {
        text: "FAQ",
        link: "/faq/"
      }
    ]
  }
];
