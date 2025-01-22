'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#2563eb"
        options={{ showSpinner: false }}
        shallowRouting
        targetPreprocessor={url => {
          const current_url = new URL(window.location.href)
          
          if (current_url.pathname==="/en" || url.pathname.startsWith("/en/")) {
            url.pathname = "/en" + url.pathname;
            if (url.pathname.endsWith("/"))
              url.pathname = url.pathname.slice(0, -1);
            url.href = url.origin + url.pathname + url.search
          }
          
          return url
        }}
      />
    </>
  );
};

export default LoaderProvider;