'use client'

import { MAIN_PAGES } from "@/constants/pages.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import useUserPermissions from "@/hooks/user-permissions-hook";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import { IUserConf } from "@/types/user.types";
import { utc, UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import Link from "next/link";
import LoadingComponent from "../loading-component";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

function ProfileConf({
  conf,
  prefetch = false
}: Readonly<{
  conf: IUserConf
  prefetch?: boolean
}>) {
  const { locale, dateLocale } = useLocale();
  const start = new UTCDate(conf.startDate);
  const end = conf.endDate != undefined ? new UTCDate(conf.endDate) : null;
  const title = locale === 'en' && conf.isEnglishEnabled
    ? conf.conferenceNameEn ?? conf.conferenceNameRu
    : conf.conferenceNameRu;
  const status = locale === 'en' && conf.isEnglishEnabled
    ? conf.statusEn ?? conf.statusRu
    : conf.statusRu ?? conf.statusEn;

  const permissions = useUserPermissions(conf.permissions);
  const t = useScopedI18n('confs.admins');

  return (
    <Link href={MAIN_PAGES.CONF(conf.slug)} className="rounded-lg" key={"conf_"+conf.slug} prefetch={prefetch}>
      <Card className="w-full hover:bg-accent/70">
        <div className="md:grid grid-cols-[1fr_auto] w-full *:p-4">
          <CardHeader>
            <CardTitle className="text-xl">{title}</CardTitle>
            {status && <CardDescription>{status}</CardDescription>}
          </CardHeader>
          <div className="p-6 space-y-1.5 max-md:pt-0">
            <div className="flex justify-center items-center gap-2 max-md:text-sm text-muted-foreground">
              <time dateTime={start.toISOString()}>{format(start, "PPP", { locale: dateLocale, in: utc })}</time>
              {end && "-"}
              {end && <time dateTime={end.toISOString()}>{format(end, "PPP", { locale: dateLocale, in: utc })}</time>}
            </div>
          </div>
        </div>
        <Separator />
        <CardContent className="flex gap-2 p-4">
          <label className="font-bold">{t('permissions')}:</label>
          <span className="text-muted-foreground self-center">{permissions || "-"}</span>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function ProfileConfs({
  conferences,
  className,
  prefetch,
  ...props
}: Readonly<{
  conferences: IUserConf[]|"loading"
  prefetch?: boolean
}> & React.HTMLAttributes<HTMLDivElement>) {
  if (conferences === "loading") return <LoadingComponent />
  
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      {conferences.slice(0, 3).map(conf => <ProfileConf key={conf.slug} conf={conf} prefetch={prefetch} />)}
    </div>
  )
}
