'use client'

import { useAuth } from "@/components/layout/providers/auth-provider";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

export default function Profile() {
  const { locale, dateLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  if (user === "unauthorized") 
    router.replace(AUTH_PAGES.LOGIN(pathname));

  if (user === "loading") return (
    <Card className="mt-2">
      <CardHeader>
        <Skeleton className="h-6 w-64 max-w-full" />
        <Skeleton className="h-4 w-32 max-w-full" />
      </CardHeader>
    </Card>
  )

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>{}</CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
