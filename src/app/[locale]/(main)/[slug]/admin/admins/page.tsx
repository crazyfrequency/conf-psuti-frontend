'use client'

import Page403 from "@/components/auth/403";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { useAuth } from "@/components/layout/providers/auth-provider";
import LoadingComponent from "@/components/loading-component";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PermissionFlags } from "@/lib/user-permissions";
import { useScopedI18n } from "@/locales/client";

export default function page() {
  const { data, permissions, isLoading, reload } = useConfContext();
  const t = useScopedI18n("confs");
  const { user } = useAuth();

  if (user === "loading" || isLoading) return <LoadingComponent />

  if (!permissions.hasAnyRole("ADMIN") && !permissions.hasAnyPermission(PermissionFlags.ADMIN)) 
    return <Page403 />

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{"admins.title"}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
