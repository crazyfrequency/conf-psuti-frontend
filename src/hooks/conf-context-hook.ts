'use client'

import { TResponseResult } from "@/api/error";
import { TConfContext } from "@/components/layout/conf/conf-context";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { getConf } from "@/services/confs.client.service";
import { TConf } from "@/types/conf.types";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useConfHook({
  slug,
  response
}: Readonly<{
  slug: string,
  response: TResponseResult<TConf>
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const [context, setContext] = useState<TConfContext>(() => {
    if (response.status === 'success')
      return { isLoading: false, data: response.data, reload: () => {}, clientLoading: false };
    return { isLoading: true, data: null, reload: () => {}, clientLoading: true };
  });

  const fetchConf = useCallback(async () => {
    const response = await getConf(slug);
    if (response.status === 'unauthorized')
      return router.replace(AUTH_PAGES.LOGIN(pathname));
    if (response.status !== 'success')
      return setContext({ isLoading: true, data: "forbidden", reload: fetchConf, clientLoading: false });
    setContext({ isLoading: false, data: response.data, reload: fetchConf, clientLoading: false });
  }, [context]);

  useEffect(() => {
    if (response.status === "success") return setContext({
      isLoading: false,
      data: response.data,
      reload: fetchConf,
      clientLoading: false
    });
    if (user === "unauthorized") return router.replace(AUTH_PAGES.LOGIN(pathname));
    if (user === "loading") return;
    fetchConf();
  }, [response, slug, user]);

  return { context, fetchConf }
}