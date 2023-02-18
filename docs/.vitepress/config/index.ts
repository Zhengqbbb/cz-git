import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { pwa } from '../build/plugins/pwa'
import { enConfig } from './en'
import { zhConfig } from './zh'
import { shareConfig } from './share'

export default withPwa(defineConfig({
  ...shareConfig,
  locales: {
    root: { label: 'English', lang: 'en-US', ...enConfig },
    zh: { label: '简体中文', lang: 'zh-CN', ...zhConfig },
  },
  pwa,
}))
