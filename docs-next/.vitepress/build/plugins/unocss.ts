import Unocss from "unocss/vite";
import { presetAttributify, presetIcons, presetUno } from "unocss";

/**
 * The instant on-demand Atomic CSS engine.
 * @see https://uno.antfu.me/
 */
export const unocssPlugin = Unocss({
  shortcuts: [
    [
      "btn",
      "px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
    ],
    ["feat", "md:w-30% w-100% lg:px-0 md:px-3 px-10"],
    ["featTitle", "dark:c-coolGray c-coolGray-6 md:text-6 text-5 font-600 pt-8 pb-6"]
  ],
  presets: [
    presetUno({
      dark: "class"
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2
    })
  ]
});
