'use client'

import Page403 from "@/components/auth/403";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { useAuth } from "@/components/layout/providers/auth-provider";
import LoadingComponent from "@/components/loading-component";
import { Separator } from "@/components/ui/separator";
import { CONF_PAGES } from "@/constants/pages.constants";
import { PermissionFlags } from "@/lib/user-permissions";
import { useRouter } from "@bprogress/next";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import EditInfo from "./edit-info";

const EditClient = dynamic(() => import('@/app/[locale]/(main)/[slug]/[sub_path]/edit/edit'), {
  loading: () => <LoadingComponent />,
  ssr: false,
});

export default function InfoEdit() {
  const { permissions } = useConfContext();
  const { slug, sub_path } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  
  const canEditInfo = permissions.hasAnyRole("ADMIN") || permissions.hasAnyPermission(PermissionFlags.ADMIN, PermissionFlags.WRITE);
  const canEditContent = permissions.hasAnyRole("ADMIN") || permissions.hasAnyPermission(PermissionFlags.ADMIN, PermissionFlags.WRITE_PAGES);

  useEffect(() => {
      if (user === "unauthorized")
        router.push(CONF_PAGES.CONF_PAGE(slug as string, sub_path as string));
    }, [user])

  if (user === "loading") return <LoadingComponent />

  if (!canEditInfo && !canEditContent) return <Page403 />

  return (
    <>
      {canEditInfo && <EditInfo />}
      {canEditInfo && canEditContent && <Separator className="my-8" />}
      {canEditContent && <EditClient autoFocus={false} />}
    </>
  )
}
