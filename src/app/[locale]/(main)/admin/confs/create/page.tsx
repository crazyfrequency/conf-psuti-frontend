'use server'

import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import CreateConf from "./create";

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('confs.create'))('title');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function CreateConfSsr() {
  return <CreateConf />
}
