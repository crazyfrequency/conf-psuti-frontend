'use server'

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { getCurrentLocale } from "@/locales/server";
import { getConfBySlug } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Conf from "./[sub_path]/conf";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string }>
}>): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const conf_response = await getConfBySlug(slug);

  if (conf_response.status === 'error') return notFound();

  if (conf_response.status !== 'success') return {
    ...NO_INDEX_PAGE
  };

  const title = conf_response.data.includeEn && locale === 'en'
    ? conf_response.data.conferenceNameEn
    : conf_response.data.conferenceNameRu;

  return {
    title: title,
    alternates: {
      canonical: `/confs/${slug}`,
      languages: {
        ru: `/ru/confs/${slug}`,
        en: `/en/confs/${slug}`,
      }
    }
  }
}

export default async function ConfSsr({ params }: {params: Promise<{ slug: string }>}) {
  const { slug } = await params;
  let response = await getConfBySlug(slug);
  if(response.status === 'error') return notFound();
  return <Conf response={response}/>
}
