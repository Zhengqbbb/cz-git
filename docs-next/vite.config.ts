import { defineConfig } from "vite";
import { unocssPlugin, unpluginComponents } from "./.vitepress/build";
export default defineConfig({
  plugins: [unpluginComponents, unocssPlugin]
});
