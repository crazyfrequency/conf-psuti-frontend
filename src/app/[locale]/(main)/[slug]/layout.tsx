'use server'

import Page500 from "@/components/auth/500";
import ConfContext from "@/components/layout/conf/conf-context";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { getCurrentLocale } from "@/locales/server";
import { getConfBySlug } from "@/services/confs.server.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({
  params
}: Readonly<{
  params: Promise<{ slug: string }>
}>): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getCurrentLocale();
  const response = await getConfBySlug(slug);

  if (response.status !== 'success') return {
    ...NO_INDEX_PAGE
  };

  const title = response.data.isEnglishEnabled && locale === 'en'
    ? response.data.conferenceNameEn
    : response.data.conferenceNameRu;

  return {
    title: title
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

  const response = await getConfBySlug(slug);

  if (response.status === "not-found") return notFound();
  if (response.status === "error") return <Page500 />;

  return (
    <ConfContext slug={slug} response={response}>
      {children}
    </ConfContext>
  );
}
