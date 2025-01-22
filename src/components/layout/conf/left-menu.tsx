'use client'

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HTMLAttributes } from "react";
import { useConfContext } from "./conf-context";

// TODO: реализовать переключение языков
export default function LeftMenu({
  className,
  ...props
}: Readonly<
  HTMLAttributes<HTMLDivElement>
>) {
  const { slug, sub_path } = useParams();
  const { data, isLoading } = useConfContext();
  const t = useScopedI18n('confs');
  const locale = useCurrentLocale();

  if (data === "forbidden") return null;

  const elements = data?.paths?.map((v) => (
      <li key={`nav_${v.url}`}>
        <Button
          className="justify-start w-full whitespace-pre-wrap h-auto"
          variant={ sub_path === v.url ? 'default' : 'ghost'}
          asChild
        >
          <Link href={`/${slug}/${v.url}`}>
            {v.titleRu}
          </Link>
        </Button>
      </li>
    )) ?? isLoading ? Array.from({ length: 5 }).map((_, i) => (
      <li key={`nav_skeleton_${i}`}>
        <Skeleton className="w-full h-8" />
      </li>
    )) : null

  return (
    <nav className={cn("py-2 h-fit lg:max-w-52", className)} {...props}>
      <ul className="grid gap-2 px-1">
        <li key='nav_info'>
          <Button
            className="justify-start w-full h-auto"
            variant={ !sub_path || sub_path === 'info' ? 'default' : 'ghost'}
            asChild
          >
            <Link href={`/${slug}`}>
              {t('pages.info')}
            </Link>
          </Button>
        </li>
        {elements}
      </ul>
    </nav>
  )
}
