import { TResponseResult } from "@/api/error";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { getNewConfs } from "@/services/confs.client.service";
import { TConf } from "@/types/conf.types";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useNewConfs() {
  const [confsResponse, setConfs] = useState<TResponseResult<TConf[]>|null>(null);
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  
  const fetchNewConfs = useCallback(async () => {
    setLoading(true);
    setConfs(await getNewConfs())
    setLoading(false);
  }, [setConfs, setLoading]);

  useEffect(() => {
    if (user === "unauthorized") return router.push(AUTH_PAGES.LOGIN(pathname));
    fetchNewConfs()
  }, [user]);

  return { confsResponse, isLoading, reload: fetchNewConfs };
}