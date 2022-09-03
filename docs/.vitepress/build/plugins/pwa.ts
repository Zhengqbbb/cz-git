import fg from 'fast-glob'
import { resolve } from 'pathe'
import { VitePWA } from 'vite-plugin-pwa'
import { descriptionEN, githubSourceContentRegex, name } from '../../meta'

/**
 * Vite Plugin PWA uses Workbox  library to build the service worker
 * can find more information on Workbox section.
 * @see https://vite-plugin-pwa.netlify.app/
 */
export const pwaPlugin = VitePWA({
  outDir: '.vitepress/dist',
  registerType: 'autoUpdate',
  // include all static assets under public/
  includeAssets: fg.sync('**/*.{png,svg,gif,ico,txt}', { cwd: resolve(__dirname, '../../../public') }),
  manifest: {
    id: '/',
    name,
    short_name: name,
    description: descriptionEN,
    theme_color: '#dd6954',
    icons: [
      {
        src: '/images/icons/apple-touch-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        src: '/images/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/logo.svg',
        sizes: '165x165',
        type: 'image/svg',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    navigateFallbackDenylist: [/^\/new$/],
    globPatterns: ['**/*.{css,js,html,png,svg,gif,ico,woff2}'],
    runtimeCaching: [
      {
        urlPattern: githubSourceContentRegex,
        handler: 'CacheFirst',
        options: {
          cacheName: 'githubusercontent-images-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
})
