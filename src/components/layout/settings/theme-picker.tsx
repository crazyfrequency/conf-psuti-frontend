'use client'

import { Button, ButtonProps } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useScopedI18n } from '@/locales/client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemePicker({
  variant = 'ghost',
  ...props
}: ButtonProps) {
  const { theme, setTheme } = useTheme();
  const i18n = useScopedI18n('main_header.themes');
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
            {i18n('hint')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={theme}>
          <DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>
            {i18n('light')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>
            {i18n('dark')}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" onClick={() => setTheme("system")}>
            {i18n('system')}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
