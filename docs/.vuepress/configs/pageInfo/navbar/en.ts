import type { NavbarConfig } from "@vuepress/theme-default";
import { version } from "../meta";

export const en: NavbarConfig = [
  {
    text: "Guide",
    link: "/guide/"
  },
  {
    text: `v${version}`,
    children: [
      {
        text: "Changelog",
        link: "https://github.com/Zhengqbbb/cz-git/blob/main/CHANGELOG.md"
      }
    ]
  }
];
