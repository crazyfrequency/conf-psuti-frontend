'use client'

import Page500 from "@/components/auth/500";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataLabel, DataText } from "@/components/ui/data-info";
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
      <CardContent className="grid gap-4 pb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`skeleton_${i}`} className="grid grid-cols-[auto_1fr] max-md:grid-cols-[auto_auto] gap-y-2 gap-x-1.5 md:gap-x-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-full max-w-64" />
          </div>
        ))}
      </CardContent>
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
        <div className="grid grid-cols-[auto_1fr] max-md:grid-cols-[auto_auto] gap-y-2 gap-x-1.5 md:gap-x-3">
          <DataLabel>{t('email')}</DataLabel>
          <DataText>{user.email}</DataText>
          <DataLabel>{t('phone')}</DataLabel>
          <DataText>{user.phone || t('not_specified')}</DataText>
          <DataLabel>{t('country')}</DataLabel>
          <DataText>{user.country || t('not_specified')}</DataText>
          <DataLabel>{t('city')}</DataLabel>
          <DataText>{user.city || t('not_specified')}</DataText>
          <DataLabel>{t('home_address')}</DataLabel>
          <DataText>{user.homeAddress || t('not_specified')}</DataText>
          <DataLabel>{t('organization')}</DataLabel>
          <DataText>{user.organization || t('not_specified')}</DataText>
          <DataLabel>{t('organization_address')}</DataLabel>
          <DataText>{user.organizationAddress || t('not_specified')}</DataText>
          <DataLabel>{t('organization_position')}</DataLabel>
          <DataText>{user.organizationPosition || t('not_specified')}</DataText>
          <DataLabel>{t('academic_degree')}</DataLabel>
          <DataText>{user.academicDegree || t('not_specified')}</DataText>
          <DataLabel>{t('academic_title')}</DataLabel>
          <DataText>{user.academicTitle || t('not_specified')}</DataText>
          <DataLabel>{t('supervisor')}</DataLabel>
          <DataText>{user.supervisor || t('not_specified')}</DataText>
        </div>
      </CardContent>
      <Separator />
      <CardContent className="grid gap-4 pt-3">
        
      </CardContent>  
    </Card>
  )
}
