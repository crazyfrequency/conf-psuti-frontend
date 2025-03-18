'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import { useI18n } from "@/locales/client";
import { getNewEmailConfirmation } from "@/services/auth.service";
import { useRouter } from "@bprogress/next";
import { addMinutes, formatDistance, isAfter } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ConfirmEmail() {
  const [email, setEmail] = useState('');
  const [time, setTime] = useState<string|null>(null);
  const { locale, dateLocale } = useLocale();
  const params = useSearchParams();
  const router = useRouter();
  const t = useI18n();

  useEffect(() => {
    const sendTime = addMinutes(Number(params.get('time')), 5);
    setEmail(params.get('email') ?? '');
    if (!sendTime || isAfter(Date.now(), sendTime)) return;
    setTime(formatDistance(Date.now(), sendTime, { includeSeconds: true, locale: dateLocale }));

    const interval = setInterval(() => {
      const now = Date.now();
      if (isAfter(now, sendTime)) {
        clearInterval(interval);
        return setTime(null);
      }
      setTime(formatDistance(now, sendTime, { includeSeconds: true, locale: dateLocale }));
    }, 2500);

    return () => clearInterval(interval);
  }, [params]);

  if (!params.get('email') && !params.get('exp'))
    router.replace(AUTH_PAGES.LOGIN());

  const sendConfirmEmail = useCallback(async (email: string) => {
    const response = await getNewEmailConfirmation(email);
    if (response.status === 'success') {
      toast.success(t('confirm_email.message'));
      return router.replace(AUTH_PAGES.CONFIRM_EMAIL(email, +Date.now()));
    }

    if (response.code === 429) {
      toast.error(t('confirm_email.fetch_timeout'))
      return
    }

    if (response.status === 'error')
      toast.error(t('errors.fetch'), {
        description: response.message[locale]
      })
  }, [setTime]);
  
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{params.get('time') ? t('confirm_email.message') : t("confirm_email.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{t('confirm_email.message_description')}</p>
        {time && (<p>{t('confirm_email.message_time', { time })}</p>)}
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => sendConfirmEmail(email)}>
          {t('confirm_email.button')}
        </Button>
      </CardFooter>
    </Card>
  )
}
