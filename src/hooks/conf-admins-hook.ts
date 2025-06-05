'use client'

import { AUTH_PAGES } from "@/constants/pages.constants";
import { getAdmins } from "@/services/user.service";
import { IAdminUser } from "@/types/user.types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function useConfAdminsHook(
  slug: string
) {
  const pathname = usePathname();
  const router = useRouter();

  const [admins, setAdmins] = useState<IAdminUser[]|"error"|"forbidden"|null>(null);

  const fetchAdmins = useCallback(async () => {
    const response = await getAdmins(slug);
    if (response.status === 'unauthorized')
      return router.push(AUTH_PAGES.LOGIN(pathname));
    if (response.status === 'forbidden')
      return setAdmins('forbidden');
    if (response.status !== 'success')
      return setAdmins('error');
    setAdmins(response.data);
  }, [slug, router, pathname, setAdmins]);

  useEffect(() => {
    fetchAdmins();
  }, [slug]);

  return { isLoading: !admins, admins: admins ?? [], reload: fetchAdmins };
}