'use server'

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

export async function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('title'))('admin');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    },
    ...NO_INDEX_PAGE
  }
}

export default async function AdminLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}>) {
  const locale = (await params).locale;
  setStaticParamsLocale(locale);
  
  return children
}
