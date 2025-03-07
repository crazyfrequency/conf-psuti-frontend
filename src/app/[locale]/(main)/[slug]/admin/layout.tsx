import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  ...NO_INDEX_PAGE
}

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
