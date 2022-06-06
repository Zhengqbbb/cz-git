import type { DefaultTheme } from "vitepress";

export const zh: DefaultTheme.Sidebar = {
  "/zh/": [
    {
      text: "指南",
      items: [
        {
          text: "简介",
          link: "/zh/guide/introduction"
        },
        {
          text: "动机",
          link: "/zh/guide/why"
        },
        {
          text: "快速开始",
          link: "/zh/guide/"
        }
      ]
    },
    {
      text: "Config",
      items: [
        {
          text: "配置模板",
          link: "/zh/config/"
        },
        {
          text: "显示相关",
          link: "/zh/config/show"
        },
        {
          text: "工程化相关",
          link: "/zh/config/engineer"
        }
      ]
    },
    {
      text: "小窍门",
      items: [
        {
          text: "scopes",
          link: "/zh/recipes/"
        },
        {
          text: "defaultScope",
          link: "/zh/recipes/defaultScope"
        },
        {
          text: "defaultIssues",
          link: "/zh/recipes/defaultIssues"
        }
      ]
    },
    {
      text: "常见问题",
      items: [
        {
          text: "FAQ",
          link: "/zh/faq/"
        }
      ]
    }
  ]
};
