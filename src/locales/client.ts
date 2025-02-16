import { fallbackLocale } from '@/constants/i18n.constants';
import { createI18nClient } from 'next-international/client';

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, defineLocale, useCurrentLocale } =
  createI18nClient(
    {
      en: async () => import('./en/en'),
      ru: async () => import('./ru/ru'),
    },
    { fallbackLocale },
  );