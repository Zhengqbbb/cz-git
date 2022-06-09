import { defineConfig } from "vite";
import { unocssPlugin, unpluginComponents, pwaPlugin, pwaPostPlugin } from "./.vitepress/build";

export default defineConfig({
  plugins: [unpluginComponents, unocssPlugin, pwaPlugin, pwaPostPlugin]
});
