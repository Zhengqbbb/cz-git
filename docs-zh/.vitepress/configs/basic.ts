import type { LocaleConfig } from "vitepress";
import { name, descriptionCN } from "../meta";

export const base = "/zh/";

export const locales: Record<string, LocaleConfig> = {
  "/": {
    title: name,
    description: descriptionCN,
    lang: "zh-CN",
    label: "简体中文"
  }
};
