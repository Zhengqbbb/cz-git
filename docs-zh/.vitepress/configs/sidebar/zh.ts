import type { DefaultTheme } from "vitepress";

export const zh: DefaultTheme.Sidebar = {
  "/": [
    {
      text: "指南",
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: "简介",
          link: "/guide/introduction"
        },
        {
          text: "动机",
          link: "/guide/why"
        },
        {
          text: "快速开始",
          link: "/guide/"
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
          link: "/config/"
        },
        {
          text: "显示相关",
          link: "/config/show"
        },
        {
          text: "工程化相关",
          link: "/config/engineer"
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
          link: "/recipes/"
        },
        {
          text: "markBreakingChange",
          link: "/recipes/breakingchange"
        },
        {
          text: "issuePrefixs",
          link: "/recipes/issuePrefixs"
        },
        {
          text: "defaultScope",
          link: "/recipes/defaultScope"
        },
        {
          text: "defaultSubject",
          link: "/recipes/defaultSubject"
        },
        {
          text: "defaultIssues",
          link: "/recipes/defaultIssues"
        }
      ]
    },
    {
      text: "常见问题",
      items: [
        {
          text: "FAQ",
          link: "/faq/"
        }
      ]
    }
  ]
};
