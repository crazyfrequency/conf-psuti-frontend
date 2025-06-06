'use client'

import Page500 from "@/components/auth/500";
import ProfileConfs from "@/components/confs/profile-confs";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { getMyConferences } from "@/services/user.service";
import type { IUserConf } from "@/types/user.types";
import { useRouter } from "@bprogress/next";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [conferences, setConferences] = useState<IUserConf[]|"unauthorized"|"error"|"loading">([]);
  const { user: authUser } = useAuth();
  const locale = useCurrentLocale();
  const t = useScopedI18n("errors");
  const router = useRouter();

  useEffect(() => {
    getMyConferences().then(res => {
      if (res.status === "success")
        return setConferences(res.data);
      if (res.status === "unauthorized") setConferences("unauthorized");
      else setConferences("error");
      toast.error(t('fetch'), {
        description: res.message[locale]
      })
    })
  }, [authUser]);

  if (conferences === "unauthorized") return null
  if (conferences === "error") return <Page500 />

  return (
    <div className="flex flex-col gap-4 mt-2">
      <ProfileConfs conferences={conferences} prefetch />
    </div>
  )
}
