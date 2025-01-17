'use client'

import { Button, ButtonProps } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/locales/client';
import { Languages } from 'lucide-react';

export default function LocalePicker({
  variant = 'ghost',
  ...props
}: ButtonProps) {
  const currentLocale = useCurrentLocale();
  const i18n = useScopedI18n('main_header');
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
            {i18n('locale_hint')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={currentLocale}>
          <DropdownMenuRadioItem value="ru" onClick={() => changeLocale('ru')}>
            Русский
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="en" onClick={() => changeLocale('en')}>
            English
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
