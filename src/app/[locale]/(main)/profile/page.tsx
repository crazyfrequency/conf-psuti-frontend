'use server'

import { getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Profile from "./profile";

export async function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ locale: string }>
}>): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const title = (await getScopedI18n('profile'))('title');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function page() {
  return <Profile />
}
