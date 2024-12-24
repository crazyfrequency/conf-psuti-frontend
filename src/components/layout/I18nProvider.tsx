import { I18nProviderClient } from '@/locales/client';

export default function I18nProvider({
  locale,
  children
}: Readonly<{
  locale: string,
  children: React.ReactNode
}>) {
  return <I18nProviderClient locale={locale} children={children} />
}
