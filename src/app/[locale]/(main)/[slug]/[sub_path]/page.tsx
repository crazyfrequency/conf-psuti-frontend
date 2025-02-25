'use server'

import { CACHE_MODE } from "@/constants/app.constants";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { getConfBySlug } from "@/services/confs.server.service";
import { Metadata } from "next";
import Conf from "./conf";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string, sub_path: string }>
}>): Promise<Metadata> {
  const { slug, sub_path } = await params;

  if (CACHE_MODE === 'force-cache') {
    const response = await getConfBySlug(slug, 'only-if-cached');
    if (response.status !== 'success') return { ...NO_INDEX_PAGE };
    if (!response.data?.pages?.some?.(page => page.path === sub_path))
      return { ...NO_INDEX_PAGE };
  }

  return {
    alternates: {
      canonical: `/${slug}/${sub_path}`,
      languages: {
        en: `/${slug}/en/${sub_path}`,
        ru: `/${slug}/ru/${sub_path}`,
      }
    }
  }
}

export default async function ConfSsr({ params }: {params: Promise<{ slug: string, sub_path: string }>}) {
  return <Conf/>
}
