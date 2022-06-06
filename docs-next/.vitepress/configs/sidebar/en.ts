import type { DefaultTheme } from "vitepress";

export const en: DefaultTheme.Sidebar = {
  "/": [
    {
      text: "Guide",
      items: [
        {
          text: "Introduction",
          link: "/guide/introduction"
        },
        {
          text: "Why cz-git",
          link: "/guide/why"
        },
        {
          text: "Getting Started",
          link: "/guide/"
        }
      ]
    },
    {
      text: "Config",
      items: [
        {
          text: "Configure Template",
          link: "/config/"
        },
        {
          text: "Show Related",
          link: "/config/show"
        },
        {
          text: "Engineering Related",
          link: "/config/engineer"
        }
      ]
    },
    {
      text: "Recipes",
      items: [
        {
          text: "scopes",
          link: "/recipes/"
        },
        {
          text: "defaultScope",
          link: "/recipes/defaultScope"
        },
        {
          text: "defaultIssues",
          link: "/recipes/defaultIssues"
        }
      ]
    },
    {
      text: "FAQ",
      items: [
        {
          text: "FAQ",
          link: "/faq/"
        }
      ]
    }
  ]
};
