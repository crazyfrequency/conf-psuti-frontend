'use client'

import { Separator } from "@/components/ui/separator";
import { HELP_DESK_EMAIL } from "@/constants/app.constants";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

export default function Page500({
  className,
  footerClassName,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>> & Readonly<{
  footerClassName?: string
}>) {
  const t = useScopedI18n("errors.500");
  return (
    <div className={cn(
      "fixed top-0 left-0 z-50 bg-background gap-3 h-dvh w-screen flex flex-col justify-center items-center font-sans text-center",
      className
    )} {...props}>
      <meta name="robots" content="noindex nofollow" />
      <meta name="googlebot" content="noindex nofollow" />
      <div className="flex justify-center items-center gap-6">
        <h1 className="text-2xl my-2">500</h1>
        <Separator orientation="vertical" />
        <h2 className="text-sm">{t('title')}</h2>
      </div>
      <p>{t('description')}</p>
      <footer className={cn(
        "fixed bottom-2 justify-center items-center",
        footerClassName
      )}>
        <p>
          Служба поддержки <a className="underline text-primary" href={`mailto:${HELP_DESK_EMAIL}`}>helpdesk@psuti.ru</a>
        </p>
      </footer>
    </div>
  )
}
