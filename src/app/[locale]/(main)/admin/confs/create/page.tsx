'use server'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";
import CreateConf from "./create";

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('confs.create'))('title');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function CreateConfSsr({
  params
}: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const t = await getScopedI18n("confs.create");
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateConf />
      </CardContent>
    </Card>
  )
}
