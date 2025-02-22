'use client'

import { useCurrentLocale } from "@/locales/client";
import { enUS, ru } from "date-fns/locale";

export const useLocale = () => {
  const locale = useCurrentLocale();
  return {
    locale,
    dateLocale: locale === 'ru' ? ru : enUS
  }
}