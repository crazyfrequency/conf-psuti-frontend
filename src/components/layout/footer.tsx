'use server'

import { EMAIL, PHONE } from "@/constants/app.constants";
import { cn } from "@/lib/utils";
import { getScopedI18n } from "@/locales/server";

export default async function Footer({
  year,
  className,
  ...props
}: Readonly<{
  year: number|string,
  className?: string,
}> & Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  const t = await getScopedI18n('footer');

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
        <a className="underline text-primary" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        {" "}
        {t('phone')}{" "}
        <a className="underline text-primary" href={`tel:${PHONE}`}>
          {PHONE}
        </a>
      </p>
    </footer>
  )
}
