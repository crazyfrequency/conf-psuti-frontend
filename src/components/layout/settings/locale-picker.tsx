'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/locales/client';
import { Languages } from 'lucide-react';
import { ComponentProps } from 'react';

export default function LocalePicker({
  variant = 'ghost',
  ...props
}: ComponentProps<typeof Button>) {
  const currentLocale = useCurrentLocale();
  const t = useScopedI18n('main_header');
  const changeLocale = useChangeLocale({
    preserveSearchParams: true
  });
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant={variant} {...props} size="icon">
                <Languages className="transition-all" />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>
            {t('locale_hint')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={currentLocale}>
          <DropdownMenuRadioItem className="cursor-pointer" value="ru" onClick={() => changeLocale('ru')}>
            Русский
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="cursor-pointer" value="en" onClick={() => changeLocale('en')}>
            English
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
