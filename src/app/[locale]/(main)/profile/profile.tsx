'use client'

import Page500 from "@/components/auth/500";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Locales } from "@/constants/i18n.constants";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import { getUserNames } from "@/lib/localalization-tools";
import { useScopedI18n } from "@/locales/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

export default function Profile() {
  const { locale, dateLocale } = useLocale();
  const t_languages = useScopedI18n('languages');
  const t = useScopedI18n('profile');
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  if (user === "unauthorized") {
    router.replace(AUTH_PAGES.LOGIN(pathname));
    return null
  }

  if (user === "loading") return (
    <Card className="mt-2">
      <CardHeader>
        <Skeleton className="h-6 w-64 max-w-full" />
        <Skeleton className="h-4 w-32 max-w-full" />
      </CardHeader>
    </Card>
  )

  if (user === "error") return <Page500 />

  const names = getUserNames(user, locale);
  const title = `${names.lastName} ${names.firstName}`
    + (names.middleName ? ` ${names.middleName}` : '');

  return (
    <Card className="mt-2">
      <CardHeader className="relative">
        <CardTitle className="w-full mr-4 truncate whitespace-normal">
          {title}
        </CardTitle>
        <CardDescription>
          {t('preferred_locale')}: {t_languages(`names.${user.preferredLocale.toLowerCase() as Locales}`)}
        </CardDescription>
        <Button className="absolute right-6 top-1/2 -translate-y-1/2" variant="ghost" size="icon">
          <Pencil />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 pb-3">
        <p>
          {t('email')}{": "}
          <a href={`mailto:${user.email}`} className="underline text-primary">
            {user.email}
          </a>
        </p>
        <p>

        </p>
      </CardContent>
      <Separator />
      <CardContent className="grid gap-4 pt-3">
        
      </CardContent>  
    </Card>
  )
}
