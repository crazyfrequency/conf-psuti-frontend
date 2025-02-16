'use server'

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { getCurrentLocale } from "@/locales/server";
import { getConfBySlug } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Conf from "./conf";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string, sub_path: string }>
}>): Promise<Metadata> {
  const { slug, sub_path } = await params;
  const locale = await getCurrentLocale();
  const response = await getConfBySlug(slug);
  
  if (response.status === 'error') return notFound();

  if (response.status !== 'success') return {
    ...NO_INDEX_PAGE
  };

  const title = response.data.isEnglishEnabled && locale === 'en'
    ? response.data.conferenceNameEn
    : response.data.conferenceNameRu;

  return {
    title: title,
    alternates: {
      canonical: `/confs/${slug}/${sub_path}`,
      languages: {
        ru: `/ru/confs/${slug}/${sub_path}`,
        en: `/en/confs/${slug}/${sub_path}`,
      }
    }
  }
}

export default async function ConfSsr({ params }: {params: Promise<{ slug: string, sub_path: string }>}) {
  const { slug } = await params;
  let data = await getConfBySlug(slug);
  if(data.status === "error") return notFound();
  return <Conf response={data}/>
}
