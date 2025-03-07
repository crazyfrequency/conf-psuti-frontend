'use client'

import { useAuth } from "@/components/layout/providers/auth-provider";
import LoadingComponent from "@/components/loading-component";
import { Button } from "@/components/ui/button";
import { CONF_PAGES } from "@/constants/pages.constants";
import { useRouter } from "@bprogress/next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

export default function EditClient() {
  const pathname = usePathname();
  const { slug, sub_path } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user === "unauthorized") 
      router.replace(CONF_PAGES.CONF_PAGE(slug as string, sub_path as string));
    
    
  }, [user])

  // if (user === "unauthorized") {
  //   router.replace(AUTH_PAGES.LOGIN(pathname));
  // }

  return (
    <div>
      <Editor />
      <div className="flex gap-2 mt-4 justify-end">
        <Button variant="secondary" asChild>
          <Link href={CONF_PAGES.CONF_PAGE(slug as string, sub_path as string)}>
            Отменить
          </Link>
        </Button>
        <Button>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
