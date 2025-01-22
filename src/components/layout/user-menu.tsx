'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AUTH_PAGES } from '@/constants/pages.constants';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './providers/auth-provider';

export default function UserMenu() {
  const t = useScopedI18n('main_header.user_menu');
  const locale = useCurrentLocale();
  const { user } = useAuth();
  const pathname = usePathname();

  const first_name = user?.first_name_ru ?? user?.first_name_en;

  if (user === "unauthorized")
    return (
      <Button variant="outline" className='gap-2 ml-1 bg-transparent' asChild>
        <Link href={AUTH_PAGES.LOGIN(pathname)}>
          <CircleUser />{t('login')}
        </Link>
      </Button>
    )
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
            <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>

        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
