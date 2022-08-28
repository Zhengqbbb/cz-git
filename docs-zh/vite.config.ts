import { defineConfig } from 'vite'
import { pwaPlugin, unocssPlugin } from './.vitepress/build'

export default defineConfig({
  plugins: [unocssPlugin, pwaPlugin],
})
