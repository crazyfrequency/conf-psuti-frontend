'use server'

import Page500 from "@/components/auth/500";
import Confs from "@/components/confs/confs";
import { getScopedI18n } from "@/locales/server";
import { getConfsListByYear } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ year: string }>
}>): Promise<Metadata> {
  const t = await getScopedI18n('confs_list');
  const { year } = await params;
  return {
    title: t('title_with_year', { year: year }),
    description: t('description_with_year', { year: year }),
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
  const data = await getConfsListByYear(+year);
  if (data.status === 'error') return <Page500 />;
  if (data.status !== 'success') notFound();
  if (data.data.length === 0) return notFound();
  return <Confs response={data}/>
}
