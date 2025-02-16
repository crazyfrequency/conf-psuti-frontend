export const locales = ['en', 'ru'] as const;

export const defaultLocale = 'ru';

export const fallbackLocale = {
  en: 'ru',
  ru: 'en',
} as const;