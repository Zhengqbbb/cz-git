import type { DefaultTheme } from "vitepress";
import { version } from "../../meta";

export const en: DefaultTheme.NavItem[] = [
  {
    text: "Guide",
    link: "/guide/"
  },
  {
    text: `v${version}`,
    items: [
      {
        text: "Changelog",
        link: "https://github.com/Zhengqbbb/cz-git/blob/main/CHANGELOG.md"
      }
    ]
  }
];
