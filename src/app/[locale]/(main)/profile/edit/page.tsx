'use client'

import Page500 from "@/components/auth/500";
import { useAuth } from "@/components/layout/providers/auth-provider";
import EditUser from "@/components/users/edit-user";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { getMyProfile } from "@/services/user.service";
import { TUserProfile } from "@/types/user.types";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [user, setUser] = useState<TUserProfile|"unauthorized"|"error"|"loading">("loading");
  const { user: authUser } = useAuth();
  const locale = useCurrentLocale();
  const t = useScopedI18n("errors");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getMyProfile().then(res => {
      if (res.status === "success")
        return setUser(res.data);
      if (res.status === "unauthorized") setUser("unauthorized");
      else setUser("error");
      toast.error(t('fetch'), {
        description: res.message[locale]
      })
    })
  }, [authUser]);

  if (user === "unauthorized") {
    router.push(AUTH_PAGES.LOGIN(pathname));
    return null
  }
  
  if (user === "error") return <Page500 />

  return (
    <EditUser user={user} />
  )
}
