'use client';

import { locales } from '@/constants/i18n.constants';
import { ProgressProvider as ProgressBar } from '@bprogress/next/app';

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressBar
      height="4px"
      color="#2563eb"
      options={{ showSpinner: false }}
      shallowRouting
      targetPreprocessor={url => {
        const current_url = new URL(window.location.href)

        const currentLocale = locales.find(locale => current_url.pathname === `/${locale}` || current_url.pathname.startsWith(`/${locale}/`));

        if (currentLocale) {
          url.pathname = `/${currentLocale}` + url.pathname;
          if (url.pathname.endsWith("/")) {
            url.pathname = url.pathname.slice(0, -1);
          }
          url.href = url.origin + url.pathname + url.search;
        }
        
        return url
      }}
      children={children}
    />
  );
};

export default LoaderProvider;