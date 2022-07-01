import type { DefaultTheme } from "vitepress";

export const en: DefaultTheme.Sidebar = {
  "/cli/": [
    {
      text: "Guide",
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: "Introduction",
          link: "/cli/"
        },
        {
          text: "Getting Started",
          link: "/cli/install"
        },
        {
          text: "Why czg",
          link: "/cli/why"
        }
      ]
    },
    {
      text: "Subcommands",
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: "break",
          link: "/cli/break"
        },
        {
          text: "emoji",
          link: "/cli/emoji"
        },
        {
          text: "checkbox",
          link: "/cli/checkbox"
        }
      ]
    },
    {
      text: "Options",
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: "--retry",
          link: "/cli/retry"
        },
        {
          text: "--config",
          link: "/cli/config"
        }
      ]
    }
  ],
  "/": [
    {
      text: "Guide",
      collapsible: true,
      collapsed: false,
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
      collapsible: true,
      collapsed: false,
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
      collapsible: true,
      collapsed: false,
      items: [
        {
          text: "alias",
          link: "/recipes/alias"
        },
        {
          text: "scopes",
          link: "/recipes/"
        },
        {
          text: "markBreakingChange",
          link: "/recipes/breakingchange"
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
