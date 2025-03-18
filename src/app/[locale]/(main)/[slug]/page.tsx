'use client'

import { useConfContext } from "@/components/layout/conf/conf-context";
import { DataLabel, DataText } from "@/components/ui/data-info";
import { useLocale } from "@/hooks/date-locale.hook";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { tz } from "@date-fns/tz";
import { utc, UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import Conf from "./[sub_path]/conf";

export default function Info() {
  const { data, isLoading } = useConfContext();
  const t = useScopedI18n('confs.info');
  const { dateLocale } = useLocale();
  const locale = useCurrentLocale();

  if (isLoading || typeof data !== 'object') return null;

  const start = new UTCDate(data.startDate);
  const end = data.endDate ? new UTCDate(data.endDate) : null;

  const tzComponent = tz("UTC+04");

  const closingDateForApplications = data.closingDateForApplications ? tzComponent(data.closingDateForApplications) : null;
  const closingDateForRegistrations = data.closingDateForRegistrations ? tzComponent(data.closingDateForRegistrations) : null;

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] px-4 gap-3">
        <DataLabel>{t('dates')}</DataLabel>
        <DataText className="flex items-center text-sm font-normal gap-1.5 max-lg:gap-1">
          <time dateTime={start.toISOString()}>
            {format(start, 'PPP (eeee)', { locale: dateLocale, in: utc })}
          </time>
          {start !== end && end && (
            <>
              –
              <time dateTime={end.toISOString()}>
                {format(end, 'PPP (eeee)', { locale: dateLocale, in: utc })}
              </time>
            </>
          )}
        </DataText>
        {closingDateForApplications && (
          <>
            <DataLabel>{t('registration')}</DataLabel>
            <DataText>
              <time dateTime={closingDateForApplications.toISOString()}>
                {format(closingDateForApplications, 'PPPpppp (eeee)', { locale: dateLocale, in: tzComponent })}
              </time>
            </DataText>
          </>
        )}
        {closingDateForRegistrations && (
          <>
            <DataLabel>{t('registration')}</DataLabel>
            <DataText>
              <time dateTime={closingDateForRegistrations.toISOString()}>
                {format(closingDateForRegistrations, 'PPPpppp (eeee)', { locale: dateLocale, in: tzComponent })}
              </time>
            </DataText>
          </>
        )}
        {data.meetingPointRu && (
          <>
            <DataLabel>{t('place')}</DataLabel>
            <DataText>{locale === 'en' ? data.meetingPointEn ?? data.meetingPointRu : data.meetingPointRu}</DataText>
          </>
        )}
        {data.webSite && (
          <>
            <DataLabel>{t('site')}</DataLabel>
            <DataText>{data.webSite}</DataText>
          </>
        )}
        {data.email && (
          <>
            <DataLabel>{t('email')}</DataLabel>
            <DataText>{data.email}</DataText>
          </>
        )}
        {data.phone && (
          <>
            <DataLabel>{t('phone')}</DataLabel>
            <DataText>{data.phone}</DataText>
          </>
        )}
      </div>
      <Conf />
    </>
  )
}
