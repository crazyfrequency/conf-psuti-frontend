'use server'

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import ConfirmCode from "./confirm-code";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("confirm_email");
  return {
    title: t("title"),
    ...NO_INDEX_PAGE
  }
}

export default async function page() {
  return <ConfirmCode />
}
