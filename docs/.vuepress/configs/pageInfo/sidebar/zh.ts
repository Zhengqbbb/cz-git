import type { SidebarConfig } from "@vuepress/theme-default";

export const zh: SidebarConfig = {
  "/zh/guide/": [
    {
      text: "文档",
      children: [
        "/zh/guide/README.md",
        "/zh/guide/why.md",
        "/zh/guide/getting-started.md",
        "/zh/guide/configuration.md"
      ]
    },
    {
      text: "配置说明",
      children: ["/zh/guide/options-show.md", "/zh/guide/option-engineer.md"]
    },
    "/zh/guide/recipes.md",
    "/zh/guide/faq.md",
  ]
};
