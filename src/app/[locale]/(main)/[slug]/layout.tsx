'use server'

import ConfContext from "@/components/layout/conf/conf-context";
import { getCurrentLocale } from "@/locales/server";
import { getConf } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

// TODO: add locale
export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string }>
}>): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const response = await getConf(slug);

  if (response.status === 'error') return notFound();

  if (response.status !== 'success') return {
    title: "Auth"
  };

  const title = response.data.include_en && locale === 'en'
    ? response.data.title_en
    : response.data.title_ru;
  
  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function Layout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>
}>) {
  const { slug } = await params;

  const response = await getConf(slug);

  if (response.status==='error') notFound();

  return (
    <ConfContext slug={slug} response={response}>
      {children}
    </ConfContext>
  );
}
