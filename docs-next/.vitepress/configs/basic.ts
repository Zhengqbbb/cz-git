import type { LocaleConfig } from "vitepress";
import { name, descriptionCN, descriptionEN } from "../meta";

export const base = "/";

export const locales: Record<string, LocaleConfig> = {
  "/": {
    title: name,
    description: descriptionEN,
    lang: "en-US",
    label: "English"
  },
  "/zh/": {
    title: name,
    description: descriptionCN,
    lang: "zh-CN",
    label: "简体中文"
  }
};
