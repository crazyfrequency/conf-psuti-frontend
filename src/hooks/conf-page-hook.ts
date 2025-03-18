import { AUTH_PAGES } from "@/constants/pages.constants";
import { getConfPage } from "@/services/confs.client.service";
import { TConfPage } from "@/types/conf.types";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";

// TODO доделать и использовать
export default function useConfPage(slug: string, path: string) {
  const [page, setPage] = useState<TConfPage|"error"|"forbidden"|"not-found"|null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const fetchPage = useCallback(async () => {
    const response = await getConfPage(slug, path);
    if (response.status === 'unauthorized')
      return router.replace(AUTH_PAGES.LOGIN(pathname));
    if (response.status === 'not-found')
      return setPage('not-found');
    if (response.status === 'error')
      return setPage('error');
    // return setPage(response.data);
  }, [setPage, pathname, router, slug, path]);

  return { isLoading: !page, page,  }
}