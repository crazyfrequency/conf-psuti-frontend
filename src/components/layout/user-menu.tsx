'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AUTH_PAGES } from '@/constants/pages.constants';
import { useScopedI18n } from '@/locales/client';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserMenu() {
  const t = useScopedI18n('main_header.user_menu');
  const pathname = usePathname();

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
            <CircleUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
