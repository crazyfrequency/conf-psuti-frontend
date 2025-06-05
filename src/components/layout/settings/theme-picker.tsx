'use client'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useScopedI18n } from '@/locales/client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ComponentProps } from 'react';

export default function ThemePicker({
  variant = 'ghost',
  ...props
}: ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();
  const t = useScopedI18n('main_header.themes');
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant={variant} {...props} size="icon">
                <Sun
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            {t('hint')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={theme}>
          <DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>
            {t('light')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>
            {t('dark')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" onClick={() => setTheme("system")}>
            {t('system')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
