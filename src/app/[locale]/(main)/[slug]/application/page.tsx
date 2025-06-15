'use client'

import { useConfApplicationsContext } from "@/components/layout/conf/applications-context";
import { useConfContext } from "@/components/layout/conf/conf-context";
import LoadingComponent from "@/components/loading-component";

export default function page() {
  const { data, isLoading, pageActive, reload } = useConfApplicationsContext();
  const { data: confData, isLoading: confLoading } = useConfContext();

  if (isLoading || confLoading) return <LoadingComponent />

  

  return (
    <div className="px-3">
      
    </div>
  )
}
