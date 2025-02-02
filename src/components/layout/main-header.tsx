import logo_light from "@/components/images/logo_pguti_color.svg";
import logo_dark from "@/components/images/logo_pguti_white.svg";
import { MAIN_PAGES } from "@/constants/pages.constants";
import Image from "next/image";
import Link from "next/link";
import LocalePicker from "./settings/locale-picker";
import ThemePicker from "./settings/theme-picker";
import UserMenu from "./user-menu";

export default function HeaderMain() {
  return (
    <nav className="flex h-full w-full mx-2 items-center">
      <Link href={MAIN_PAGES.HOME} className="h-full">
        <Image className="h-full w-auto not-dark:block dark:hidden" src={logo_light} alt="ПГУТИ" />
        <Image className="h-full w-auto hidden dark:block" src={logo_dark} alt="ПГУТИ" />
      </Link>
      <ul className="flex gap-1 ml-auto align-middle">
        <li>
          <ThemePicker />
        </li>
        <li>
          <LocalePicker />
        </li>
        <li>
          <UserMenu />
        </li>
      </ul>
    </nav>
  )
}
