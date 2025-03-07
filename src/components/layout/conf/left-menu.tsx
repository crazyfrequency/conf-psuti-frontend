'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { locales } from "@/constants/i18n.constants";
import { AUTH_PAGES, CONF_PAGES } from "@/constants/pages.constants";
import { PermissionFlags } from "@/lib/user-permissions";
import { cn } from "@/lib/utils";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes, useMemo } from "react";
import { useAuth } from "../providers/auth-provider";
import { useConfContext } from "./conf-context";

const default_pages = ["info", "committee", "program", "proceedings", "report", "contacts"] as const;

export default function LeftMenu({
  className,
  ...props
}: Readonly<
  HTMLAttributes<HTMLDivElement>
>) {
  const path = usePathname();
  const segments = path.split('/').filter(Boolean);
  const { data, permissions, isLoading } = useConfContext();
  const locale = useCurrentLocale();
  const t = useScopedI18n('confs');
  const router = useRouter();
  const { user } = useAuth();

  const isAdmin = useMemo(() => {
    return permissions.hasAnyRole("ADMIN") ||
      permissions.hasAnyPermission(PermissionFlags.ADMIN);
  }, [permissions])

  if (data === "forbidden") return null;

  if ((locales as readonly string[]).includes(segments[0]))
    segments.shift();

  const [slug, sub_path, ...rest] = segments;

  const isEdit = rest[rest.length - 1] === 'edit';

  const elements = data?.pages?.map((v) => (
      <li key={`nav_${v.path}`}>
        <Button
          className="justify-start w-full whitespace-pre-wrap h-auto"
          variant={ sub_path === v.path ? 'default' : 'ghost'}
          asChild
        >
          <Link href={CONF_PAGES.CONF_PAGE(slug, v.path, isEdit)}>
            {locale === 'en' ? v.pageNameEn || v.pageNameRu : v.pageNameRu}
          </Link>
        </Button>
      </li>
    )) ?? (
      isLoading ? Array.from({ length: 5 }).map((_, i) => (
        <li key={`nav_skeleton_${i}`}>
          <Skeleton className="w-full h-8" />
        </li>
      )) : null
    )

  if (sub_path === 'admin' && user === "unauthorized")
    router.replace(AUTH_PAGES.LOGIN(path));

  return (
    <nav className={cn("py-2 h-fit lg:max-w-52", className)} {...props}>
      <ul className="grid gap-2 px-1">
        <li key='nav_info'>
          <Button
            className="justify-start w-full h-auto"
            variant={ !sub_path || sub_path === 'info' ? 'default' : 'ghost'}
            asChild
          >
            <Link href={CONF_PAGES.INFO_PAGE(slug, isEdit)}>
              {t('pages.info')}
            </Link>
          </Button>
        </li>
        {elements}
      </ul>
      {(isAdmin || permissions.hasAnyPermission(
        PermissionFlags.WRITE,
        PermissionFlags.WRITE_PAGES,
        PermissionFlags.EDIT_DATE_CONF_APP,
        PermissionFlags.EDIT_CONTENT_CONF_APP
      )) && (
        <>
          <Separator className="mt-4.5 mb-2.5" />
          <div className="flex justify-center">
            <Label className="font-bold text-[.8rem]">{t('pages.admin')}</Label>
          </div>
        </>
      )}
      <ul className="grid gap-0.5 px-1 mt-2">
        {(isAdmin || permissions.hasAnyPermission(PermissionFlags.WRITE)) &&(
          <li key='nav_admin_settings'>
            <Button
              className="justify-start w-full h-auto"
              variant={ sub_path === 'admin' && rest[0] === 'settings' ? 'default' : 'ghost'}
              asChild
            >
              <Link href={CONF_PAGES.CONF_ADMIN_PAGE(slug, 'settings')}>
                {t('pages.settings')}
              </Link>
            </Button>
          </li>
        )}
        {(isAdmin || permissions.hasAnyPermission(PermissionFlags.WRITE_PAGES)) &&(
          <li key='nav_admin_pages'>
            <Button
              className="justify-start w-full h-auto"
              variant={ sub_path === 'admin' && rest[0] === 'pages' ? 'default' : 'ghost'}
              asChild
            >
              <Link href={CONF_PAGES.CONF_ADMIN_PAGE(slug, 'pages')}>
                {t('pages.pages')}
              </Link>
            </Button>
          </li>
        )}
        {isAdmin && (
          <li key='nav_admin_admins'>
            <Button
              className="justify-start w-full h-auto"
              variant={ sub_path === 'admin' && rest[0] === 'admins' ? 'default' : 'ghost'}
              asChild
            >
              <Link href={CONF_PAGES.CONF_ADMIN_PAGE(slug, 'admins')}>
                {t('pages.admins')}
              </Link>
            </Button>
          </li>
        )}
        {(isAdmin || permissions.hasAnyPermission(PermissionFlags.EDIT_FORM)) && (
          <li key='nav_admin_form'>
            <Button
              className="justify-start w-full h-auto"
              variant={ sub_path === 'admin' && rest[0] === 'form' ? 'default' : 'ghost'}
              asChild
            >
              <Link href={CONF_PAGES.CONF_ADMIN_PAGE(slug, 'form')}>
                {t('pages.form')}
              </Link>
            </Button>
          </li>
        )}
        {(isAdmin || permissions.hasAnyPermission(PermissionFlags.WRITE_TOPICS)) && (
          <li key='nav_admin_topics'>
            <Button
              className="justify-start w-full h-auto"
              variant={ sub_path === 'admin' && rest[0] === 'topics' ? 'default' : 'ghost'}
              asChild
            >
              <Link href={CONF_PAGES.CONF_ADMIN_PAGE(slug, 'topics')}>
                {t('pages.topics')}
              </Link>
            </Button>
          </li>
        )}
        {(isAdmin || permissions.hasAnyPermission(
          PermissionFlags.READ_MAILS,
          PermissionFlags.SEND_MAILS
        )) && (
          <li key='nav_admin_mailing'>
            <Button
              className="justify-start w-full h-auto"
              variant={ sub_path === 'admin' && rest[0] === 'mailing' ? 'default' : 'ghost'}
              asChild
            >
              <Link href={CONF_PAGES.CONF_ADMIN_PAGE(slug, 'mailing')}>
                {t('pages.mailing')}
              </Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  )
}
