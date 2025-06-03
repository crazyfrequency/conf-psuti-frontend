'use client'

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PermissionFlags } from "@/lib/user-permissions";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { Pen } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { useConfContext } from "./conf-context";

const regex = /^(\/(?:ru|en)?)?\/[^\/]+\/(?:[^\/]+\/edit|admin(?:\/.*)?|application(?:\/.*)?)$/;

export default function TopMenu() {
  const { data, permissions, isLoading } = useConfContext();
  const locale = useCurrentLocale();
  const pathname = usePathname();
  const { slug, sub_path } = useParams();

  const canEdit = useMemo(() => {
    return permissions.hasAnyRole(
      'ADMIN'
    ) || permissions.hasAnyPermission(
      PermissionFlags.ADMIN,
      PermissionFlags.WRITE_PAGES
    )
    || (
      permissions.hasAnyPermission(
        PermissionFlags.WRITE
      ) && (sub_path ?? 'info' === 'info')
    );
  }, [permissions, sub_path]);

  if (isLoading) return (
    <div className="relative text-center *:mx-auto space-y-2">
      <Skeleton className="h-6 w-64 max-w-full" />
      <Skeleton className="h-4 w-32 max-w-full" />
    </div>
  );
  
  const isEditButton = canEdit && !regex.test(pathname);

  const editLink = '/' + slug + '/' + (
    typeof sub_path === "string"
      ? sub_path
      : 'info'
  ) + '/edit';

  const title = locale === 'en' && data?.isEnglishEnabled
    ? data?.conferenceNameEn
    : data?.conferenceNameRu
      ?? data?.conferenceNameRu;
  const status = locale === 'en' && data?.isEnglishEnabled
    ? data?.statusEn ?? data?.statusRu
    : data?.statusRu ?? data?.statusEn;

  return (
    <div className={cn("relative text-center", isEditButton && "md:px-10")}>
      <h1 className="text-2xl">{title}</h1>
      {
        status &&
        <h2 className="text-lg text-muted-foreground">{status}</h2>
      }
      {
        isEditButton &&
        <Button
          className="md:absolute bottom-0 md:right-0"
          variant="ghost"
          size="icon"
          asChild
        >
          <Link href={editLink}>
            <Pen />
          </Link>
        </Button>
      }
    </div>
  )
}
