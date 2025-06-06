'use client'

import Page403 from "@/components/auth/403";
import Page500 from "@/components/auth/500";
import LoadingComponent from "@/components/loading-component";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ADMIN_PAGES } from "@/constants/pages.constants";
import { useUsers } from "@/hooks/users-hook";
import { getUserNames } from "@/lib/localalization-tools";
import { useCurrentLocale } from "@/locales/client";
import type { IUser } from "@/types/auth.types";
import Link from "next/link";

function User({ user }: Readonly<{ user: IUser }>) {
  const locale = useCurrentLocale();
  const names = getUserNames(user, locale);
  
  return (
    <Link key={user.id} href={ADMIN_PAGES.USERS(user.id)} className="rounded-lg">
      <Card className="hover:bg-accent/70">
        <CardHeader>
          <CardTitle>{names.firstName} {names.lastName}{names.middleName ? ` ${names.middleName}` : ''}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default function page() {
  const { users, isLoading, reload } = useUsers();

  if (isLoading) return <LoadingComponent />

  if (users?.status === "unauthorized") return <Page403 />

  if (users?.status !== "success") return <Page500 />

  return (
    <div className="flex flex-col gap-4 mt-2">
      {users.data.map(user => <User user={user} />)}
    </div>
  )
}
