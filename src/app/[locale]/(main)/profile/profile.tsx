'use client'

import { useAuth } from "@/components/layout/providers/auth-provider";
import { useLocale } from "@/hooks/date-locale.hook";

export default function Profile() {
  const { locale, dateLocale } = useLocale();
  const { user } = useAuth();


  return (
    <>
      <div className="text-2xl"></div>
    </>
  )
}
