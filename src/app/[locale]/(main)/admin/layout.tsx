'use server'

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";

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
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
