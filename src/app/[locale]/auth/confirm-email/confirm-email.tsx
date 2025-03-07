'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { confirmEmail, getNewEmailConfirmation } from "@/services/auth.service";
import { useRouter } from "@bprogress/next";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ConfirmEmail() {
  const [email, setEmail] = useState('');
  const [time, setTime] = useState(0);
  const locale = useCurrentLocale();
  const params = useSearchParams();
  const router = useRouter();
  const t = useI18n();

  useEffect(() => {
    const code = params.get('code');
    const exp = params.get('exp');

    if (code || exp) {
      if (!code || !exp) return;
      
      (async () => {
        const response = await confirmEmail(code+"-"+exp);
        if (response.status === 'success')
          return router.replace(AUTH_PAGES.LOGIN());
        if (response.status === 'error')
          return toast.error(t('errors.fetch'), {
            description: response.message[locale]
          })
      })();
    }

    const time = params.get('time');
    setEmail(params.get('email') ?? '');
    if (!time) return;
    setTime(+time + 1000*60*5 - Date.now());

    const interval = setInterval(() => {
      setTime((time) => time - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [params]);

  if (!params.get('email') && !(params.get('code') && params.get('exp')))
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
    <Card>
      <CardHeader>
        <CardTitle>{params.get('time') ? t('confirm_email.message') : t("confirm_email.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{t('confirm_email.message_description')}</p>
        <p>{time/1000}</p>
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
