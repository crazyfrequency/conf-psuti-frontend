'use server'

import { getScopedI18n } from "@/locales/server";
import { getConfsList } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Confs from "./confs";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ year: string }>
}>): Promise<Metadata> {
  const i18n = await getScopedI18n('confs_list');
  const { year } = await params;
  return {
    title: i18n('title_with_year', { year: year }),
    description: i18n('description_with_year', { year: year }),
    alternates: {
      canonical: `/confs/${year}`,
      languages: {
        ru: `/ru/confs/${year}`,
        en: `/en/confs/${year}`,
      }
    }
  }
}

export default async function ConfsSsr({
  params
}: Readonly<{
  params: Promise<{ year: string }>
}>) {
  const { year } = await params;
  const data = await getConfsList(+year);
  if(data.status !== 'success') notFound();
  return <Confs response={data}/>
}
