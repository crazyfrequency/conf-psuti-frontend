'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ADMIN_PAGES, AUTH_PAGES, MAIN_PAGES } from '@/constants/pages.constants';
import { useKeyBind } from '@/hooks/keybind-hook';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { CircleUser, User } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './providers/auth-provider';

export default function UserMenu() {
  const t = useScopedI18n('main_header.user_menu');
  const router = useRouter();
  const locale = useCurrentLocale();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useKeyBind({
    keyBind: 'Ctrl+KeyP',
    callback: () => user !== "unauthorized" && !pathname.match(/(\/en|)\/profile/)
      ? router.push(MAIN_PAGES.PROFILE)
      : null
  })
  useKeyBind({ keyBind: 'Ctrl+Shift+KeyQ', callback: logout })

  if (user === "unauthorized")
    return (
      <Button variant="outline" className='gap-2 ml-1 bg-transparent' asChild>
        <Link href={AUTH_PAGES.LOGIN(pathname)}>
          <CircleUser />{t('login')}
        </Link>
      </Button>
    )

  const first_name = locale === 'en'
    ? user?.firstnameEn ?? user?.firstnameRu
    : user?.firstnameRu;

  const last_name = locale === 'en'
    ? user?.lastnameEn ?? user?.lastnameRu
    : user?.lastnameRu;

  const admin_pages = user?.role === 'ADMIN' ? (
      <>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={ADMIN_PAGES.NEW_CONFS}>
            {t('new_confs')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={ADMIN_PAGES.USERS}>
            {t('users')}
          </Link>
        </DropdownMenuItem>
      </>
    ) : null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
            <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate whitespace-normal">{last_name} {first_name}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={MAIN_PAGES.PROFILE}>
              {t('profile')}
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {admin_pages}
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          {t('logout')}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
