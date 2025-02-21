export const locales = ['en', 'ru'] as const;

export const localeNames: Record<
  Uppercase<typeof locales[number]>,
  Record<
    typeof locales[number],
    string
  >
> = {
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