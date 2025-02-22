'use server'

import Page500 from "@/components/auth/500";
import Confs from "@/components/confs/confs";
import { getScopedI18n } from "@/locales/server";
import { getConfsListByYear } from "@/services/confs.server.service";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n('confs_list');
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/',
      languages: {
        ru: '/ru',
        en: '/en',
      }
    }
  }
}

export default async function HomeSsr() {
  const data = await getConfsListByYear();
  if (data.status === "error") return <Page500 />;
  return <Confs current response={data}/>
}
