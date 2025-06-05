'use server'

import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import EditClient from "./edit"

// TODO: Сделать локализацию
export async function generateMetadata() {
  return {
    ...NO_INDEX_PAGE
  }
}

export default async function page() {
  return <EditClient />
}
