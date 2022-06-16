import type { DefaultTheme } from "vitepress";
import { version, github, npm } from "../../meta";

export const zh: DefaultTheme.NavItem[] = [
  {
    text: "指南",
    link: "/zh/guide/",
    activeMatch: "/zh/guide/"
  },
  {
    text: "配置",
    link: "/zh/config/",
    activeMatch: "/zh/config/"
  },
  {
    text: "窍门",
    link: "/zh/recipes/",
    activeMatch: "/zh/recipes/"
  },
  {
    text: `v${version}`,
    items: [
      {
        text: "变更日志",
        link: github + "/blob/main/CHANGELOG.md"
      },
      {
        text: "NPM",
        link: npm
      }
    ]
  }
];
