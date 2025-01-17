'use server'

import { getScopedI18n } from "@/locales/server";
import { getConfsList } from "@/services/confs.server.service";
import { Metadata } from "next";
import Confs from "./confs/[year]/confs";

export async function generateMetadata(): Promise<Metadata> {
  const i18n = await getScopedI18n('confs_list');
  return {
    title: i18n('title'),
    description: i18n('description'),
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
  const data = await getConfsList();
  return <Confs response={data}/>
}
