'use server'

import logo_light from "@/components/images/logo_pguti_color.svg";
import logo_dark from "@/components/images/logo_pguti_white.svg";
import LocalePicker from "@/components/layout/settings/locale-picker";
import ThemePicker from "@/components/layout/settings/theme-picker";
import { MAIN_PAGES } from "@/constants/pages.constants";
import { INDEX_PAGE } from "@/constants/seo.constants";
import { getScopedI18n, getStaticParams } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return getStaticParams();
}

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('title'))('default')

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    },
    ...INDEX_PAGE
  }
}

export default async function AuthLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}>) {
  const locale = (await params).locale;
  setStaticParamsLocale(locale);
  return (
    <div className="flex flex-col min-h-dvh bg-muted/45 items-center justify-center p-6 md:p-10">
      <div className="absolute top-0 flex w-full justify-between px-6 md:px-10">
        <Link href={MAIN_PAGES.HOME} className="h-20">
          <Image className="h-full w-auto dark:hidden" src={logo_light} alt="ПГУТИ" />
          <Image className="h-full w-auto hidden dark:block" src={logo_dark} alt="ПГУТИ" />
        </Link>
        <ul className="flex gap-1 items-center">
          <li>
            <ThemePicker variant="outline" />
          </li>
          <li>
            <LocalePicker variant="outline" />
          </li>
        </ul>
      </div>
      <div className="relative flex w-full max-w-sm mt-12 flex-col overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
