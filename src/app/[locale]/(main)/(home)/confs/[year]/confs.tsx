'use client'

import { TResponseResult } from "@/api/error";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Error from "@/components/ui/error";
import { MAIN_PAGES } from "@/constants/pages.constants";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { TConf } from "@/types/conf.types";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Confs({
  response
}: Readonly<{
  response: TResponseResult<TConf[]>
}>) {
  const t = useI18n();
  const locale = useCurrentLocale();

  useEffect(()=>{
    if (response.status !== 'success')
      toast.error(t('errors.fetch'), {
        description: response.message[locale],
        action: {
          label: t('errors.actions.reload'),
          onClick: () => {
            window.location.reload();
          }
        }
      })
  }, [response])

  if (response.status !== 'success')
    return <Error>Не удалось загрузить конференции</Error>

  const elements = response.data.map(conf => {
    const start = new Date(conf.startDate);
    const end = conf.endDate != undefined ? new Date(conf.endDate) : null;
    const title = locale === 'en' && conf.isEnglishEnable
      ? conf.conferenceNameEn ?? conf.conferenceNameRu
      : conf.conferenceNameRu;
    const status = locale === 'en' && conf.isEnglishEnable
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
            <time dateTime={start.toISOString()}>{start.toLocaleDateString("ru")}</time>
            {end && "-"}
            {end && <time dateTime={end.toISOString()}>{end.toLocaleDateString("ru")}</time>}
          </div>
        </Card>
      </Link>
    )
  })

  return (
    <div className="grid gap-4">
      {elements}
    </div>
  );
}
