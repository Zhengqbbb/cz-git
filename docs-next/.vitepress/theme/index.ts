import { h } from "vue";
import Theme from "vitepress/theme";
import "../style/main.css";
import "../style/vars.css";
import "uno.css";
// @ts-ignore
import { useMediumZoomProvider } from "../components/composables";
import HomePage from "../components/HomePage.vue";
import type { EnhanceAppContext } from "vitepress";

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      "home-features-after": () => h(HomePage)
    });
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    useMediumZoomProvider(app, router);
  }
};
