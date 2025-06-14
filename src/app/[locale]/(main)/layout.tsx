'use server'

import Footer from "@/components/layout/footer";
import HeaderMain from "@/components/layout/main-header";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getScopedI18n } from "@/locales/server";
import { TZDate } from "@date-fns/tz";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = (await getScopedI18n('title'))('default')

  return {
    title: {
      template: `%s | ${title}`,
      default: title
    }
  }
}

export default async function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-dvh bg-background">
      <header className={cn(
        "sticky flex items-center h-14 w-full top-0 mx-auto",
        "z-50 rounded-b-2xl border-solid border border-t-0",
        "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/25",
        "sm:max-w-(--breakpoint-sm) md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)"
      )}>
        <HeaderMain />
      </header>
      <div className="w-full mx-auto px-2 pt-2.5 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-[85rem] mt-2">
        {children}
        <Separator className="my-4" />
        <Footer year={new TZDate(Date.now(), "UTC+04").getFullYear()} />
      </div>
    </div>
  );
}
