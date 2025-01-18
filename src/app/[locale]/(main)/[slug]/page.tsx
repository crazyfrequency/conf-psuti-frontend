'use server'

import { getConf } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Conf from "./[sub_path]/conf";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string }>
}>): Promise<Metadata> {
  const { slug } = await params;
  let response = await getConf(slug);
  return {
    title: "info",
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
  let data = await getConf(slug);
  if(data.status === 'error') return notFound();
  return <Conf response={data}/>
}
