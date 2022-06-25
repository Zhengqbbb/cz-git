import { h } from "vue";
import Theme from "vitepress/theme";
import { inBrowser } from "vitepress";
import type { EnhanceAppContext } from "vitepress";
import "../style/main.css";
import "../style/vars.css";
import "uno.css";
import { useMediumZoomProvider, usePageAnalytics } from "../components/composables";
import HomePage from "../components/HomePage.vue";
import Hero from "../components/Hero.vue";
import { CodeGroup } from "../components/CodeGroup";
import CodeGroupItem from "../components/CodeGroupItem.vue";

if (inBrowser) import("./pwa");

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      "home-features-after": () => h(HomePage)
    });
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    app.component("Hero", Hero);
    app.component("CodeGroup", CodeGroup);
    app.component("CodeGroupItem", CodeGroupItem);
    useMediumZoomProvider(app, router);
    usePageAnalytics("G-K6F2G4G0ZN", "da331747a43e6c97f6ebd1e68ed3dcc8");
  }
};
