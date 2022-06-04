import type { DefaultTheme } from "vitepress";
import { version } from "../../meta";

export const zh: DefaultTheme.NavItem[] = [
  {
    text: "文档",
    link: "/zh/guide/"
  },
  {
    text: `v${version}`,
    items: [
      {
        text: "更新日志",
        link: "https://github.com/Zhengqbbb/cz-git/blob/main/CHANGELOG.md"
      }
    ]
  }
];
