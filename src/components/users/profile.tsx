'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataLabel, DataText } from "@/components/ui/data-info";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TIME_ZONE } from "@/constants/app.constants";
import { Locales } from "@/constants/i18n.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import { getUserNames } from "@/lib/localalization-tools";
import { useScopedI18n } from "@/locales/client";
import type { TUserProfile } from "@/types/user.types";
import { tz } from "@date-fns/tz";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import ProfileConfs from "../confs/profile-confs";
import { useAuth } from "../layout/providers/auth-provider";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const tzDate = tz(TIME_ZONE);

export default function UserProfile({
  user,
  editPath,
  confsPath
}: Readonly<{
  user: TUserProfile|"loading"
  editPath?: string
  confsPath?: string
}>) {
  const t_languages = useScopedI18n('languages.names');
  const { locale, dateLocale } = useLocale();
  const { user: authUser } = useAuth();
  const t = useScopedI18n('profile');

  const admin = useMemo(() => {
    if (typeof authUser !== 'object') return false;
    return authUser?.role === 'ADMIN';
  }, [authUser]);

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

  const names = getUserNames(user, locale);
  const title = `${names.lastName} ${names.firstName}`
    + (names.middleName ? ` ${names.middleName}` : '');

  return (
    <Card className="mt-2">
      <div className="grid grid-cols-[1fr_auto]">
        <CardHeader className="pr-2">
          <CardTitle className="w-full truncate whitespace-normal">
            {title}
          </CardTitle>
          <CardDescription>
            {t('preferred_locale')}: {t_languages(`${user.preferredLocale.toLowerCase() as Locales}`)}
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col justify-center p-4 pl-0">
          <Button variant="ghost" size="icon" asChild>
            {editPath && <Link href={editPath}><Pencil /></Link>}
          </Button>
        </div>
      </div>
      <CardContent className="pb-3">
        {(admin || user.image) && (
          <div className="lg:float-right lg:max-w-2/5 max-lg:mb-2">
            {admin && (
              <div className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-1.5 p-4 bg-accent rounded-md">
                <DataLabel>{t('registration')}:</DataLabel>
                <div>
                  <DataText>{format(tzDate(user.createdAt), 'PPP', { in: tzDate, locale: dateLocale })}</DataText>
                  <DataText>{format(tzDate(user.createdAt), 'ppp', { in: tzDate, locale: dateLocale })}</DataText>
                </div>
                <DataLabel>{t('role')}:</DataLabel>
                <DataText>{user.role ? t(`roles.${user.role}`) : t('not_specified')}</DataText>
                <DataLabel className="col-span-2 max-md:max-w-none justify-start lg:justify-center">{t(`confirmed.${user.emailVerified ?? false}`)}</DataLabel>
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-[auto_1fr] gap-y-2 gap-x-1.5 md:gap-x-3">
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
        <div className="flex w-full gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                {t('change.email')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">
                {t('change.password')}
              </Button>
            </DialogTrigger>
            <DialogContent>
              
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
      {user.conferences?.length !== 0 && confsPath && (
        <>
          <Separator />
          <CardHeader>
            <CardTitle>{t('conferences')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-0">
            <ProfileConfs conferences={user.conferences?.slice?.(0, 3)} prefetch={true} />
            <Button className="w-full" variant="secondary" asChild>
              <Link href={confsPath}>•••</Link>
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  )
}
