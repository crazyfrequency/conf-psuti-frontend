export const locales = ['en', 'ru'] as const;

export type Locales = typeof locales[number];

export type BigLocales = Uppercase<Locales>;

export const defaultLocale = 'ru';

export const fallbackLocale = {
  en: 'ru',
  ru: 'en',
} as const;