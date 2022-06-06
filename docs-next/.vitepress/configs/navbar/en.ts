import type { DefaultTheme } from "vitepress";
import { version, github, npm } from "../../meta";

export const en: DefaultTheme.NavItem[] = [
  {
    text: "Guide",
    link: "/guide/"
  },
  {
    text: "Config",
    link: "/config/"
  },
  {
    text: "Recipes",
    link: "/recipes/"
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
      }
    ]
  }
];
