'use client'

import { TResponseResult } from "@/api/error";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/hooks/date-locale.hook";
import { useScopedI18n } from "@/locales/client";
import { TConf } from "@/types/conf.types";
import { utc, UTCDate } from "@date-fns/utc";
import { format } from "date-fns";
import Conf from "./[sub_path]/conf";

export default function Info({
  response
}: {
  response: TResponseResult<TConf>
}) {
  const { data, isLoading } = useConfContext();
  const t = useScopedI18n('confs.info');
  const { dateLocale } = useLocale();
  if (isLoading || typeof data !== 'object') return null;

  const start = new UTCDate(data.startDate);
  const end = data.endDate ? new UTCDate(data.endDate) : null;
  const closingDateForApplications = data.closingDateForApplications ? new UTCDate(data.closingDateForApplications) : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Label className="flex justify-end items-center font-bold text-base">{t('dates')}</Label>
        <div className="flex items-center text-sm font-normal gap-1.5">
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
        </div>
        {closingDateForApplications && (
          <>
            <Label className="flex justify-end items-center font-bold text-base">{t('registration')}</Label>
            <div className="flex items-center text-sm font-normal">
              <time dateTime={closingDateForApplications.toISOString()}>
                {format(closingDateForApplications, 'PPP', { locale: dateLocale, in: utc })}
              </time>
            </div>
          </>
        )}
      </div>
      <Conf response={response} />
    </>
  )
}
