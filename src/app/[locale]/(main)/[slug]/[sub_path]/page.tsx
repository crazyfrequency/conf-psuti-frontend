'use server'

import { Metadata } from "next";
import Conf from "./conf";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string, sub_path: string }>
}>): Promise<Metadata> {
  const { slug, sub_path } = await params;

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

export default async function ConfSsr() {
  return <Conf />
}
