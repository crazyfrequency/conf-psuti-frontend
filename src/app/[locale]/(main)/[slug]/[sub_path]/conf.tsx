'use client'

import Page403 from "@/components/auth/403";
import Page500 from "@/components/auth/500";
import { useAuth } from "@/components/layout/providers/auth-provider";
import LoadingComponent from "@/components/loading-component";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { getLocalizedConfPage } from "@/services/confs.client.service";
import { TLocalizedConfPage } from "@/types/conf.types";
import DOMPurify from "dompurify";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Conf() {
  const [page, setPage] = useState<TLocalizedConfPage|"error"|"forbidden"|"not-found"|null>(null);
  const t_error = useScopedI18n("errors");
  const { slug, sub_path } = useParams();
  const locale = useCurrentLocale();
  const { user } = useAuth();

  useEffect(() => {
    getLocalizedConfPage(slug as string, (sub_path ?? "info") as string, locale).then(t => {
      if (t.status !== 'success') {
        if (t.status === 'forbidden') setPage("forbidden");
        else if (t.status === 'not-found') return setPage("not-found");
        else setPage("error");

        return toast.error(t_error('fetch'), {
          description: t.message[locale],
          action: {
            label: t_error('actions.reload'),
            onClick: () => {
              window.location.reload();
            }
          }
        });
      }

      setPage(t.data);
    });
  }, [user, slug, sub_path])

  if (!page) return <LoadingComponent />

  if (page === "not-found") return sub_path && notFound();

  if (page === "error") return <Page500 />

  if (page === "forbidden") return <Page403 />

  return (
    <div className="relative w-full px-3 MainEditorTheme" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page?.htmlContent || "") }} />
  );
}
