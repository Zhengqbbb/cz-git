import { defineConfig } from "vite";
import { unocssPlugin, unpluginComponents, pwaPlugin } from "./.vitepress/build";

export default defineConfig({
  plugins: [unpluginComponents, unocssPlugin, pwaPlugin]
});
