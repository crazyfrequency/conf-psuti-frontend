'use client'

import { EMAIL, PHONE } from "@/constants/app.constants";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";

export default function Footer({
  year,
  className,
  ...props
}: Readonly<{
  year: number|string,
  className?: string,
}> & Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  const t = useScopedI18n('footer');

  return (
    <footer
      className={cn("relative mb-4 text-center text-sm", className)}
      {...props}
      >
      <p>
        {t('message', { year })}
      </p>
      <p>
        {t('administrations')}{" "}
        {t('email')}{" "}
        <a className="underline" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        {" "}
        {t('phone')}{" "}
        <a className="underline" href={`tel:${PHONE}`}>
          {PHONE}
        </a>
      </p>
    </footer>
  )
}
