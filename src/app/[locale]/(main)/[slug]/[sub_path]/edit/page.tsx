'use server'

import Editor from "@/components/editor"
import { NO_INDEX_PAGE } from "@/constants/seo.constants"

// TODO: Сделать локализацию
export async function generateMetadata() {
  return {
    title: 'Страница редактирования конференции',
    ...NO_INDEX_PAGE
  }
}

export default function page() {
  return (
    <div>
      <Editor />
    </div>
  )
}
