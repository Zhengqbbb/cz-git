import { defineConfig } from 'vitepress'
import { enConfig } from './en'
import { zhConfig } from './zh'
import { shareConfig } from './share'

export default defineConfig({
  ...shareConfig,
  locales: {
    root: { label: 'English', lang: 'en-US', ...enConfig },
    zh: { label: '简体中文', lang: 'zh-CN', ...zhConfig },
  },
})
