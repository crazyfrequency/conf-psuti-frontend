export const locales = ['en', 'ru'] as const;

export type Locales = typeof locales[number];

export type BigLocales = Uppercase<Locales>;

export const localeNames: Record<BigLocales, Record<Locales, string>> = {
  EN: {
    en: 'English',
    ru: 'Английский',
  },
  RU: {
    en: 'Russian',
    ru: 'Русский',
  },
}

export const defaultLocale = 'ru';

export const fallbackLocale = {
  en: 'ru',
  ru: 'en',
} as const;