'use server'

import { getScopedI18n } from "@/locales/server";
import { getConfsListByYear } from "@/services/confs.server.service";
import { Metadata } from "next";
import Confs from "./confs/[year]/confs";

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
  return <Confs response={data}/>
}
