import { defineConfig } from 'vite'
import { pwaPlugin, unocssPlugin } from '../docs/.vitepress/build'

export default defineConfig({
  plugins: [unocssPlugin, pwaPlugin],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
})
