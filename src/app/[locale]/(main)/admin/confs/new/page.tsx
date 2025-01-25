'use server'

import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('confs.new'))('title');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default function NewConfsSsr() {
  return (
    <div>page</div>
  )
}
