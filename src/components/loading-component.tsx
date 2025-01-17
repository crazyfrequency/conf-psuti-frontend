import logo_light from "@/components/images/logo_pguti_color.svg";
import logo_dark from "@/components/images/logo_pguti_white.svg";
import Image from "next/image";

export default function LoadingComponent() {
  return (
    <div className='flex justify-center items-center'>
      <div className="flex h-40 animate-pulse">
        <Image className="h-full w-auto dark:hidden" src={logo_light} alt="ПГУТИ" />
        <Image className="h-full w-auto hidden dark:block" src={logo_dark} alt="ПГУТИ" />
      </div>
    </div>
  )
}
