import { default_pages } from "@/components/layout/conf/left-menu";
import { Locales } from "@/constants/i18n.constants";

import pages_en from "./en/confs/pages";
import pages_ru from "./ru/confs/pages";

export function getStaticConfPageName(name: typeof default_pages[number]): Record<Locales, string> {
  return {
    ru: pages_ru[name],
    en: pages_en[name]
  }
}