'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useScopedI18n } from '@/locales/client';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';

export default function UserMenu() {
  const i18n = useScopedI18n('main_header.user_menu');
  return (
    <Button variant="outline" className='gap-2 ml-1 bg-transparent' asChild>
      <Link href="/login">
        <CircleUser />{i18n('login')}
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
