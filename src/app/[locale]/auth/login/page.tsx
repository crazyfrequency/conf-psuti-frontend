'use server'

import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import Login from "./login";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("login");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: '/login',
      languages: {
        ru: '/ru/login',
        en: '/en/login',
      }
    }
  }
}

export default async function LoginSsr() {
  return <Login />
}
