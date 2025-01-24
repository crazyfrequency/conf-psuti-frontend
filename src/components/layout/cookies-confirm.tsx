'use client'

import { useScopedI18n } from "@/locales/client"
import { useEffect } from "react"
import { toast } from "sonner"

export default function CookiesConfirm() {
  const t = useScopedI18n('cookies')

  useEffect(() => {
    if (localStorage.getItem('cookiesAccepted') === 'true') return
    const toastId = toast.info(t('title'), {
      closeButton: false,
      duration: Infinity,
      description: t('description'),
      action: {
        label: t('accept'),
        onClick: () => {
          localStorage.setItem('cookiesAccepted', 'true')
        }
      }
    })
    return () => {
      toast.dismiss(toastId)
    }
  }, [t])
  return null
}
