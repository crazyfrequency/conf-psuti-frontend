'use client'

import Confs from "@/components/confs/confs";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ADMIN_PAGES } from "@/constants/pages.constants";
import useNewConfs from "@/hooks/new-confs.hook";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function NewConfs() {
  const { confsResponse, isLoading, reload } = useNewConfs();
  const t = useScopedI18n('confs.new');
  const { user } = useAuth();

  const elements = confsResponse === null ? (
      <div className="grid gap-4 mt-4">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-34 md:h-20" />
        ))}
      </div>
    ) : <Confs response={confsResponse} />
  
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold h-max">{t('title')}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={reload}
            disabled={isLoading}
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          </Button>
          <Button variant="outline" asChild>
            <Link href={ADMIN_PAGES.CREATE_CONF}>
              {t('create')}
              <Plus />
            </Link>
          </Button>
        </div>
      </div>
      {elements}
    </div>
  )
}
