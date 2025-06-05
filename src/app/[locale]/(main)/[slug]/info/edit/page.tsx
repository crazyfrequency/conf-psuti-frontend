import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import { Metadata } from "next"
import InfoEdit from "./edit"

export const metadata: Metadata = {
  ...NO_INDEX_PAGE
}

export default function page() {
  return <InfoEdit />
}
