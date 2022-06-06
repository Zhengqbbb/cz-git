import Components from "unplugin-vue-components/vite";

/**
 * On-demand components auto importing for Vue.
 * @see https://github.com/antfu/unplugin-vue-components#usage
 */
export const unpluginComponents = Components({
  include: [/\.vue/, /\.md/],
  dirs: ".vitepress/components",
  dts: ".vitepress/components.d.ts"
});
