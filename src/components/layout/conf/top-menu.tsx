'use client'

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { Pen } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { useConfContext } from "./conf-context";

export default function TopMenu() {
  const { data, isLoading } = useConfContext();
  const locale = useCurrentLocale();
  const pathname = usePathname();
  const { slug, sub_path } = useParams();
  const { user } = useAuth();

  if (isLoading) return (
    <div className="relative text-center">
      <h1 className="text-2xl"><Skeleton className="h-5 w-20" /></h1>
      <h2 className="text-lg text-muted-foreground"><Skeleton className="h-4 w-20" /></h2>
    </div>
  );

  const isAdmin = user !== "unauthorized" && user?.role === 'ADMIN';
  const isEditButton = isAdmin && !pathname.endsWith('/edit');

  const editLink = '/' + slug + '/' + (
    typeof sub_path === "string"
      ? sub_path
      : 'info'
  ) + '/edit';

  const title = locale === 'en' && data?.isEnglishEnable
    ? data?.conferenceNameEn
    : data?.conferenceNameRu
      ?? data?.conferenceNameRu;
  const status = locale === 'en' && data?.isEnglishEnable
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
