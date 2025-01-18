'use server'

import { getConf } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Conf from "./conf";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string, sub_path: string }>
}>): Promise<Metadata> {
  const { slug, sub_path } = await params;
  let response = await getConf(slug);
  if(response.status === 'error') return notFound();
  return {
    title: sub_path,
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
  let data = await getConf(slug);
  if(data.status === "error") return notFound();
  return <Conf response={data}/>
}
