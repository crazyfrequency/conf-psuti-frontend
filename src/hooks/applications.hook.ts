'use client'

import type { TConfApplicationsContext } from "@/components/layout/conf/applications-context";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { getSelfConfApplications } from "@/services/applications.service";
import { utc } from "@date-fns/utc";
import { isFuture } from "date-fns";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useConfApplicationsHook(slug: string) {
  const pathname = usePathname();
  const { user } = useAuth();

  const [context, setContext] = useState<Omit<TConfApplicationsContext, "pageActive">>({
    isLoading: true,
    data: null,
    reload: () => {}
  });

  const fetchApplications = useCallback(async () => {
    const response = await getSelfConfApplications(slug);
    if (response.status === 'unauthorized')
      return setContext({ isLoading: false, data: null, reload: fetchApplications });
    if (response.status !== 'success')
      return setContext({ isLoading: true, data: "forbidden", reload: fetchApplications });
    setContext({ isLoading: false, data: response.data, reload: fetchApplications });
  }, [slug]);

  useEffect(() => {
    if (user === "loading") return;
    if (user === "unauthorized")
      return setContext({ isLoading: false, data: null, reload: fetchApplications });
    fetchApplications();
  }, [slug, user]);

  const { data } = useConfContext();

  const pageActive = useMemo(() => {
    if (!data || typeof data !== "object")
      return context.data && typeof context.data === "object";
    const hasApplications = 
      (context.data && Array.isArray(context.data) && context.data.length > 0) ?? false;
    if (!data.closingDateForRegistrations) 
      return data.endDate ? isFuture(utc(data.endDate)) || hasApplications : hasApplications;
    return isFuture(new Date(data.closingDateForRegistrations)) || hasApplications;
  }, [context.data, data]);

  return { ...context, reload: fetchApplications, pageActive };
}