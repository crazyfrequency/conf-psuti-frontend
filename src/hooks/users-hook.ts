import { TResponseResult } from "@/api/error";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { getAllUsers } from "@/services/user.service";
import type { IUser } from "@/types/auth.types";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState<TResponseResult<IUser[]>|null>(null);
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setUsers(await getAllUsers());
    setLoading(false);
  }, [setUsers, setLoading]);
  
  useEffect(() => {
    if (user === "unauthorized") return router.push(AUTH_PAGES.LOGIN(pathname));
    fetchUsers()
  }, [user]);
  
  return { users, isLoading, reload: fetchUsers };
}