import { defineConfig } from 'vite'
import { pwaPlugin, unocssPlugin, unpluginComponents } from './.vitepress/build'

export default defineConfig({
  plugins: [unpluginComponents, unocssPlugin, pwaPlugin],
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
