import { createI18nMiddleware } from 'next-international/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  urlMappingStrategy: 'rewriteDefault'
});

const regex = /^\/(ru|en)?\/?([^/]+)\/info$/

export function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(regex);

  if (match) {
    const [, locale, slug] = match;

    const newPath = locale ? `/${locale}/${slug}` : `/${slug}`;
    const url = request.nextUrl.clone();
    url.pathname = newPath;

    return NextResponse.redirect(url);
  }

  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)'],
};