import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

/**
 * The instant on-demand Atomic CSS engine.
 * @see https://uno.antfu.me/
 */
export const unocssPlugin = Unocss({
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
  },
  shortcuts: [
    ['feat', 'md:w-30% w-100% lg:px-0 md:px-3 px-10'],
    ['featTitle', 'dark:c-coolGray c-coolGray-6 md:text-6 text-5 font-600 pt-8 pb-6'],
  ],
  presets: [
    presetUno({
      dark: 'class',
      preflight: false,
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'text-bottom',
      },
    }),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'Inter:400,600,800',
    //     mono: 'Noto Sans Mono:500,700',
    //   },
    // }),
  ],
})
