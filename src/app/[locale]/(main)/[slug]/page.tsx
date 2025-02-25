'use client'

import { useConfContext } from "@/components/layout/conf/conf-context";
import { DataLabel, DataText } from "@/components/ui/data-info";
import { useLocale } from "@/hooks/date-locale.hook";
import { useScopedI18n } from "@/locales/client";
import { utc, UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import Conf from "./[sub_path]/conf";

export default function Info() {
  const { data, isLoading } = useConfContext();
  const t = useScopedI18n('confs.info');
  const { dateLocale } = useLocale();
  if (isLoading || typeof data !== 'object') return null;

  const start = new UTCDate(data.startDate);
  const end = data.endDate ? new UTCDate(data.endDate) : null;
  const closingDateForApplications = data.closingDateForApplications ? new UTCDate(data.closingDateForApplications) : null;

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] px-4 gap-3">
        <DataLabel>{t('dates')}</DataLabel>
        <DataText className="flex items-center text-sm font-normal gap-1.5">
          <time dateTime={start.toISOString()}>
            {format(start, 'PPP', { locale: dateLocale, in: utc })}
          </time>
          {start !== end && end && (
            <>
              –
              <time dateTime={end.toISOString()}>
                {format(end, 'PPP', { locale: dateLocale, in: utc })}
              </time>
            </>
          )}
        </DataText>
        {closingDateForApplications && (
          <>
            <DataLabel>{t('registration')}</DataLabel>
            <DataText>
              <time dateTime={closingDateForApplications.toISOString()}>
                {format(closingDateForApplications, 'PPP', { locale: dateLocale, in: utc })}
              </time>
            </DataText>
          </>
        )}
      </div>
      <Conf />
    </>
  )
}
