'use client'

import logo_light from "@/components/images/logo_pguti_color.svg";
import logo_dark from "@/components/images/logo_pguti_white.svg";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MAIN_PAGES } from "@/constants/pages.constants";
import { useChangeLocale, useCurrentLocale, useScopedI18n } from "@/locales/client";
import { Earth, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./user-menu";

export default function HeaderMain() {
  const { theme, setTheme } = useTheme();
  const i18n = useScopedI18n('main_header.themes');
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  return (
    <nav className="flex h-full w-full mx-2 items-center">
      <Link href={MAIN_PAGES.HOME} className="h-full">
        <Image className="h-full w-auto dark:hidden" src={logo_light} alt="ПГУТИ" />
        <Image className="h-full w-auto hidden dark:block" src={logo_dark} alt="ПГУТИ" />
      </Link>
      <ul className="flex gap-1 ml-auto align-middle">
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun
                  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
              </Button>
            </DropdownMenuTrigger>
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
        </li>
        <li>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Earth className="transition-all" />
              </Button>
            </DropdownMenuTrigger>
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
        </li>
        <li>
          <UserMenu />
        </li>
      </ul>
    </nav>
  )
}
