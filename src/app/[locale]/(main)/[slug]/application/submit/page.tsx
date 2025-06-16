'use client'

import Page403 from "@/components/auth/403";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { useAuth } from "@/components/layout/providers/auth-provider";
import LoadingComponent from "@/components/loading-component";
import { PermissionFlags } from "@/lib/user-permissions";
import { useScopedI18n } from "@/locales/client";
import { isFuture } from "date-fns";

export default function page() {
  const { data, permissions, isLoading, reload } = useConfContext();
  const t = useScopedI18n("confs.application");
  const { user } = useAuth();

  if (isLoading || user === "loading") return <LoadingComponent />

  const endDate = data?.closingDateForRegistrations ?? data?.endDate;

  if (
    !isFuture(endDate) &&
    !permissions.hasAnyRole("ADMIN") &&
    !permissions.hasAnyPermission(
      PermissionFlags.ADMIN,
      PermissionFlags.CREATE_CONF_APP
    )
  ) return <Page403 />

  return (
    <div className="px-3 grid gap-2">
      
    </div>
  )
}
