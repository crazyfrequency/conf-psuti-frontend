import { fallbackLocale } from '@/constants/i18n.constants';
import { createI18nServer } from 'next-international/server';
// import en from './en';

export const { getI18n, getScopedI18n, getCurrentLocale, getStaticParams } = createI18nServer(
  {
    en: () => import('./en/en'),
    ru: () => import('./ru/ru'),
  },
  { fallbackLocale },
);