'use client'

import { TResponseResult } from "@/api/error";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { Label } from "@/components/ui/label";
import { useScopedI18n } from "@/locales/client";
import { TConf } from "@/types/conf.types";
import Conf from "./[sub_path]/conf";

export default function Info({
  response
}: {
  response: TResponseResult<TConf>
}) {
  const t = useScopedI18n('confs.info');
  const { data, isLoading } = useConfContext();
  if (isLoading || typeof data !== 'object') return null;

  const start = new Date(data.startDate);
  const end = data.endDate ? new Date(data.endDate) : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Label className="flex justify-end items-center font-bold text-base">{t('dates')}</Label>
        <div className="flex items-center text-sm font-normal gap-1.5">
          <time dateTime={start.toISOString()}>{start.toLocaleString()}</time>
          {start !== end && end && (
            <>
              –
              <time dateTime={end.toISOString()}>{end.toLocaleString()}</time>
            </>
          )}
        </div>
        {data.closingDateForApplications && (
          <>
            <Label className="flex justify-end items-center font-bold text-base">{t('registration')}</Label>
            <div className="flex items-center text-sm font-normal">
              <time dateTime={data.closingDateForApplications?.toString()}>{data.closingDateForApplications?.toLocaleString()}</time>
            </div>
          </>
        )}
      </div>
      <Conf response={response} />
    </>
  )
}
