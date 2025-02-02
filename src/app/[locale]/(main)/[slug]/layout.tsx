'use server'

import ConfContext from "@/components/layout/conf/conf-context";
import { getConfBySlug } from "@/services/confs.server.service";
import { notFound } from "next/navigation";
import React from "react";

import '@/components/editor/themes/MainEditorTheme.css';
import 'katex/dist/katex.min.css';

export default async function Layout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>
}>) {
  const { slug } = await params;

  const response = await getConfBySlug(slug);

  if (response.status==='error') notFound();

  return (
    <ConfContext slug={slug} response={response}>
      {children}
    </ConfContext>
  );
}
