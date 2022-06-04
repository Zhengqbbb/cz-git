import type { LocaleConfig } from "vitepress";

export * from "./head";
export * from "./theme";
export * from "./markdown";

export const base = "/";

export const locales: Record<string, LocaleConfig> = {
  "/": {
    lang: "en-US",
    title: "cz-git",
    label: "English",
    description:
      "A more engineered, lightweight, customizable, standard output format commitizen adapter."
  },
  "/zh/": {
    lang: "zh-CN",
    label: "简体中文",
    title: "cz-git",
    description: "一款工程性更强，轻量级，高度自定义，标准输出格式的 commitizen 适配器"
  }
};
