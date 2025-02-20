'use server'

import { getScopedI18n } from "@/locales/server";
import { Metadata } from "next";
import Profile from "./profile";

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('profile'))('title');

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function page() {
  return <Profile />
}
