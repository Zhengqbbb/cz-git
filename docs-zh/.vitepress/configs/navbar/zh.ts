import type { DefaultTheme } from "vitepress";
import { version, github, npm } from "../../meta";

export const zh: DefaultTheme.NavItem[] = [
  {
    text: "指南",
    link: "/guide/",
    activeMatch: "/guide/"
  },
  {
    text: "配置",
    link: "/config/",
    activeMatch: "/config/"
  },
  {
    text: "窍门",
    link: "/recipes/",
    activeMatch: "/recipes/"
  },
  {
    text: "CLI",
    link: "/cli/",
    activeMatch: "/cli/"
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
      },
      {
        text: "项目示例",
        link: "https://github.com/Zhengqbbb/czgit-playground"
      },
      {
        text: "常见问题",
        link: "/faq/"
      }
    ]
  }
];
