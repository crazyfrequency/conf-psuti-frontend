import { TResponseResult } from "@/api/error";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { getNewConfs } from "@/services/confs.client.service";
import { TConf } from "@/types/conf.types";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useNewConfs() {
  const [confsResponse, setConfs] = useState<TResponseResult<TConf[]>|null>(null);
  const [isLoading, setLoading] = useState(true);
  const t = useScopedI18n('errors');
  const locale = useCurrentLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  
  const fetchNewConfs = useCallback(async () => {
    setLoading(true);
    setConfs(await getNewConfs())
    setLoading(false);
  }, [setConfs, setLoading]);

  useEffect(() => {
    if (user === "unauthorized") return router.replace(AUTH_PAGES.LOGIN(pathname));
    fetchNewConfs()
  }, [user]);

  return { confsResponse, isLoading, reload: fetchNewConfs };
}