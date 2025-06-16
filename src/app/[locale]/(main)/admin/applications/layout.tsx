'use server'

import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...NO_INDEX_PAGE
  }
}

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
