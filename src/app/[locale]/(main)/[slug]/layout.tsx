'use server'

import Page500 from "@/components/auth/500";
import ConfContext from "@/components/layout/conf/conf-context";
import { getConfBySlug } from "@/services/confs.server.service";
import { notFound } from "next/navigation";
import React from "react";

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
