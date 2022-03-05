import type { NavbarConfig } from "@vuepress/theme-default";
import { version } from "../meta";

export const zh: NavbarConfig = [
  {
    text: "文档",
    link: "/zh/guide/"
  },
  {
    text: `v${version}`,
    children: [
      {
        text: "更新日志",
        link: "https://github.com/Zhengqbbb/cz-git/blob/main/CHANGELOG.md"
      }
    ]
  }
];
