'use client'

import { I18nProviderClient } from '@/locales/client';
import { useParams } from 'next/navigation';
import { JSX, useEffect } from 'react';

export default function I18nProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  const { locale: localeParam } = useParams();
  const locale = localeParam as string ?? "ru";

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <I18nProviderClient locale={locale} children={children} />
}
