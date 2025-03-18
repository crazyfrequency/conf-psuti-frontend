'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ADMIN_PAGES, AUTH_PAGES, MAIN_PAGES } from '@/constants/pages.constants';
import { useKeyBind } from '@/hooks/keybind-hook';
import { getUserNames } from '@/lib/localalization-tools';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { useRouter } from '@bprogress/next';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';
import { useAuth } from './providers/auth-provider';

export default function UserMenu() {
  const t = useScopedI18n('main_header.user_menu');
  const t_error = useScopedI18n('errors.fetches')('auth');
  const router = useRouter();
  const locale = useCurrentLocale();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useKeyBind({
    keyBind: 'Ctrl+KeyP',
    callback: () => typeof user === "object" && !pathname.match(/(\/en|\/ru|)\/profile/)
      ? router.push(MAIN_PAGES.PROFILE)
      : null
  })
  useKeyBind({
    keyBind: 'Alt+KeyC',
    callback: () => typeof user === "object" && user?.role === 'ADMIN' && !pathname.match(/(\/en|)\/admin\/confs\/new/)
      ? router.push(ADMIN_PAGES.NEW_CONFS)
      : null
  })
  useKeyBind({
    keyBind: 'Alt+KeyU',
    callback: () => typeof user === "object" && user?.role === 'ADMIN' && !pathname.match(/(\/en|)\/admin\/users/)
      ? router.push(ADMIN_PAGES.USERS)
      : null
  })
  useKeyBind({ keyBind: 'Ctrl+Shift+KeyQ', callback: logout })

  useEffect(() => {
    if (user === "error") {
      const message = toast.error(t_error, {
        duration: Infinity
      });
      return () => {
        toast.dismiss(message);
      }
    }
  }, [user])

  if (user === "loading" || user === "error")
    return (
      <Skeleton className="size-10" />
    )

  if (user === "unauthorized")
    return (
      <Button variant="outline" className='gap-2 ml-1 bg-transparent' asChild>
        <Link href={AUTH_PAGES.LOGIN(pathname)}>
          <CircleUser />{t('login')}
        </Link>
      </Button>
    )

  const names = getUserNames(user, locale);

  const admin_pages = user?.role === 'ADMIN' ? (
      <>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={ADMIN_PAGES.NEW_CONFS}>
            {t('new_confs')}
            <DropdownMenuShortcut>ALT+C</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={ADMIN_PAGES.USERS}>
            {t('users')}
            <DropdownMenuShortcut>ALT+U</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </>
    ) : null;
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                  <User />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
            <TooltipContent>
              {t('profile')}
            </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate whitespace-normal">{names.lastName} {names.firstName}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={MAIN_PAGES.PROFILE}>
              {t('profile')}
              <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {admin_pages}
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          {t('logout')}
          <DropdownMenuShortcut>Ctrl+Shift+Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
