'use client'

import { TIME_ZONE } from "@/constants/app.constants";
import { form_edit_schema as form_user_edit_schema } from "@/constants/users.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import { getUserNames } from "@/lib/localalization-tools";
import { makeZodI18nMap } from "@/lib/zod-i18n";
import { useScopedI18n } from "@/locales/client";
import { TUserProfile } from "@/types/user.types";
import { tz } from "@date-fns/tz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../layout/providers/auth-provider";
import LoadingComponent from "../loading-component";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";

const tzDate = tz(TIME_ZONE);

function getDefaultValues(user: TUserProfile|"loading", current: boolean = false): z.infer<typeof form_user_edit_schema>|undefined {
  if (user === "loading") return undefined
  return {
    preferredLocale: user.preferredLocale,
    role: current ? user.role : undefined,
    emailVerified: user.emailVerified,
    names: user.names as any,
    phone: user.phone,
    country: user.country,
    city: user.city,
    homeAddress: user.homeAddress,
    organization: user.organization,
    organizationAddress: user.organizationAddress,
    organizationPosition: user.organizationPosition,
    academicDegree: user.academicDegree,
    academicTitle: user.academicTitle,
    supervisor: user.supervisor
  }
}

export default function EditUser({
  user
}: Readonly<{
  user: TUserProfile|"loading"
}>) {
  const { user: authUser, reloadAuth } = useAuth();
  const t_languages = useScopedI18n('languages');
  const { locale, dateLocale } = useLocale();
  const t_zod = useScopedI18n('zod');
  const t = useScopedI18n('profile');

  const [ admin, current ] = useMemo(() => {
      if (typeof authUser !== 'object') return [ false, false ];
      if (typeof user !== 'object') return [ false, false ];
      return [ authUser?.role === 'ADMIN', authUser?.id === user?.id ];
    }, [authUser]);

  const form = useForm<z.infer<typeof form_user_edit_schema>>({
    resolver: zodResolver(form_user_edit_schema, { errorMap: makeZodI18nMap(t_zod) }),
    defaultValues: {
      ...getDefaultValues(user, current)
    }
  });

  useEffect(() => {
    form.reset({
      ...getDefaultValues(user, current)
    });
  }, [user]);
  
  if (user === "loading") return <LoadingComponent />

  const names = getUserNames(user, locale);
  const title = `${names.lastName} ${names.firstName}`
    + (names.middleName ? ` ${names.middleName}` : '');

  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>{title + ' - ' + t('edit')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-2" onSubmit={form.handleSubmit((console.log))}>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
