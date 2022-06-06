import type { DefaultTheme } from "vitepress";
import { version, github, npm } from "../../meta";

export const zh: DefaultTheme.NavItem[] = [
  {
    text: "指南",
    link: "/zh/guide/"
  },
  {
    text: "配置",
    link: "/zh/config/"
  },
  {
    text: "小窍门",
    link: "/zh/recipes/"
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
