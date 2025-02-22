'use server'

import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import NewConfs from "./new";

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('confs.new'))('title');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function NewConfsSsr({
  params
}: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  return <NewConfs />
}
