'use client'

import Page500 from "@/components/auth/500";
import { useConfApplicationsContext } from "@/components/layout/conf/applications-context";
import { useConfContext } from "@/components/layout/conf/conf-context";
import LoadingComponent from "@/components/loading-component";
import { Button } from "@/components/ui/button";
import { CONF_PAGES } from "@/constants/pages.constants";
import { useScopedI18n } from "@/locales/client";
import Link from "next/link";

export default function page() {
  const { data, isLoading, reload } = useConfApplicationsContext();
  const { data: confData, isLoading: confLoading } = useConfContext();
  const t = useScopedI18n("confs.application");

  if (isLoading || confLoading) return <LoadingComponent />

  if (data === "error") return <Page500 />

  return (
    <div className="px-3 grid gap-2">
      <h3 className="text-2xl font-bold">{t('title')}</h3>
      <div className="flex max-md:flex-col gap-2">
        <Button asChild>
          <Link href={CONF_PAGES.CONF_APPLICATIONS_PAGE(confData?.slug ?? '', "submit")}>
            {t('types.submit')}
          </Link>
        </Button>
      </div>
      <h3 className="text-2xl font-bold mt-4">{t('my.title')}</h3>
      {data?.length ? data?.map(app => (
        <div className="flex gap-2 items-center">
          <span>{app.titleRu}</span>
          <span>{app.status}</span>
        </div>
      )) : (
        <div>{t('my.no')}</div>
      )}
    </div>
  )
}
