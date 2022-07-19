import { registerSW } from 'virtual:pwa-register'

/** @see https://vite-plugin-pwa.netlify.app/guide/auto-update.html#ssr-ssg */
registerSW({ immediate: true })
