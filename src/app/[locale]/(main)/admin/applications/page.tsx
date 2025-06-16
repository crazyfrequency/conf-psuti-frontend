'use client'

import Page403 from "@/components/auth/403";
import Page500 from "@/components/auth/500";
import { useConfContext } from "@/components/layout/conf/conf-context";
import LoadingComponent from "@/components/loading-component";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useConfAdminApplicationsHook } from "@/hooks/applications.hook";
import { useRouter } from "@bprogress/next";
import { useParams, usePathname } from "next/navigation";

export default function page() {
  const { slug } = useParams();
  const { data, isLoading, reload } = useConfAdminApplicationsHook(slug as string);
  const { data: confData, isLoading: confLoading } = useConfContext();
  const pathname = usePathname();
  const router = useRouter();

  if (isLoading || confLoading) return <LoadingComponent />

  if (data.status === "error") return <Page500 />

  if (data.status === "unauthorized") return router.push(AUTH_PAGES.LOGIN(pathname));

  if (data.status === "forbidden") return <Page403 />

  return (
    <div className="px-3">
      
    </div>
  )
}
