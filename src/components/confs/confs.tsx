'use client'

import { TResponseResult } from "@/api/error";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Error from "@/components/ui/error";
import { MAIN_PAGES } from "@/constants/pages.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import { TConf } from "@/types/conf.types";
import { utc, UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Confs({
  response,
  className,
  current = false,
  ...props
}: Readonly<{
  response: TResponseResult<TConf[]>
  current?: boolean
}> & React.HTMLAttributes<HTMLDivElement>) {
  const { locale, dateLocale } = useLocale();
  const t = useScopedI18n('errors');

  useEffect(()=>{
    if (response.status !== 'success')
      toast.error(t('fetch'), {
        description: response.message[locale],
        action: {
          label: t('actions.reload'),
          onClick: () => {
            window.location.reload();
          }
        }
      })
  }, [response])

  if (response.status === 'forbidden')
    return <Error className={className}>{t('access.forbidden')}</Error>

  if (response.status !== 'success')
    return <Error className={className}>{t('conferences.error')}</Error>

  const elements = response.data.map(conf => {
    const start = new UTCDate(conf.startDate);
    const end = conf.endDate != undefined ? new UTCDate(conf.endDate) : null;
    const title = locale === 'en' && conf.isEnglishEnabled
      ? conf.conferenceNameEn ?? conf.conferenceNameRu
      : conf.conferenceNameRu;
    const status = locale === 'en' && conf.isEnglishEnabled
      ? conf.statusEn ?? conf.statusRu
      : conf.statusRu ?? conf.statusEn;

    return (
      <Link href={MAIN_PAGES.CONF(conf.slug)} className="rounded-lg" key={"conf_"+conf.slug} prefetch={false}>
        <Card className="md:grid grid-cols-[1fr_auto] w-full hover:bg-accent/70">
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            {status && <CardDescription>{status}</CardDescription>}
          </CardHeader>
          <div className="flex p-6 items-center gap-2 max-md:pt-0 max-md:text-sm text-muted-foreground">
            <time dateTime={start.toISOString()}>{format(start, "PPP", { locale: dateLocale, in: utc })}</time>
            {end && "-"}
            {end && <time dateTime={end.toISOString()}>{format(end, "PPP", { locale: dateLocale, in: utc })}</time>}
          </div>
        </Card>
      </Link>
    )
  })

  if (elements.length === 0)
    return <Error className={cn(
      current && "text-primary",
      className
    )}>
      {current ? t('conferences.no_current') : t('conferences.not_found')}
    </Error>

  return (
    <div
      className={cn(
        "grid gap-4",
        className
      )}
      {...props}
    >
      {elements}
    </div>
  );
}
