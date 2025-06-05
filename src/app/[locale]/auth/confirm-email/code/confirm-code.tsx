'use client'

import Page500 from "@/components/auth/500";
import LoadingComponent from "@/components/loading-component";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { confirmEmail } from "@/services/auth.service";
import { useRouter } from "@bprogress/next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ConfirmCode() {
  const [confirmed, setConfirmed] = useState<"loading" | "success" | "error">("loading");
  const t_loading = useScopedI18n('loading');
  const locale = useCurrentLocale();
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = params.get('type')

    if (type === "new") {
      toast.promise(
        confirmEmail(params.get('code')+"-"+params.get('exp')).then(v => {
          if (v.status !== "success") throw v.message[locale];
          setConfirmed("success");
        }),
        {
          loading: t_loading('fetch'),
          success: t_loading('code_confirmed'),
          error: (error) => error
        }
      )

    }
  }, [])

  if (confirmed === "error")
    return <Page500 />

  return <LoadingComponent />
}
