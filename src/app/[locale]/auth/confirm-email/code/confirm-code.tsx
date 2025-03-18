'use client'

import LoadingComponent from "@/components/loading-component";
import { MAIN_PAGES } from "@/constants/pages.constants";
import { confirmEmail } from "@/services/auth.service";
import { useRouter } from "@bprogress/next";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmCode() {
  const [confirmed, setConfirmed] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = params.get('type')

    if (type === "new") {
      const response = confirmEmail(params.get('code')+"-"+params.get('exp'));
    }
  }, [])
  
  if (!confirmed) {
    return <LoadingComponent />
  }

  router.replace(MAIN_PAGES.PROFILE);

  return (
    <div>Пока реализовано не до конца...</div>
  )
}
