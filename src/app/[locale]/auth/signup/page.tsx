'use server'

import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import SignUp from "./sign-up";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("signup");
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: '/signup',
      languages: {
        ru: '/ru/signup',
        en: '/en/signup',
      }
    }
  }
}

export default async function SignUpSsr() {
  return <SignUp />
}
