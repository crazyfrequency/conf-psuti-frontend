'use server'

import { getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

export async function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('profile'))('title');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return children
}
