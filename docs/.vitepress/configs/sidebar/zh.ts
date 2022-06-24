import type { DefaultTheme } from "vitepress";

export const zh: DefaultTheme.Sidebar = {
  "/zh/": [
    {
      text: "指南",
      collapsible: true,
      collapsed: false,
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
      text: "配置",
      collapsible: true,
      collapsed: false,
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
      text: "窍门",
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: "scopes",
          link: "/zh/recipes/"
        },
        {
          text: "markBreakingChange",
          link: "/zh/recipes/breakingchange"
        },
        {
          text: "issuePrefixs",
          link: "/zh/recipes/issuePrefixs"
        },
        {
          text: "defaultScope",
          link: "/zh/recipes/defaultScope"
        },
        {
          text: "defaultSubject",
          link: "/zh/recipes/defaultSubject"
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
