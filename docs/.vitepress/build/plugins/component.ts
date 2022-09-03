import Components from 'unplugin-vue-components/vite'
import { resolve } from 'pathe'

/**
 * On-demand components auto importing for Vue.
 * @see https://github.com/antfu/unplugin-vue-components#usage
 */
export const unpluginComponents = Components({
  include: [/\.vue/, /\.md/],
  dirs: resolve(__dirname, '../../theme/components'),
  dts: resolve(__dirname, '../../components.d.ts'),
})
