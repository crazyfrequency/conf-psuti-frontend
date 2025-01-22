'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScopedI18n } from "@/locales/client";

export default function ConfirmEmail() {
  const t = useScopedI18n('confirm_email');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t('message')}</p>
      </CardContent>
    </Card>
  )
}
