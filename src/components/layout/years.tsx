'use client'

import { TResponseResult } from "@/api/error";
import { Button } from "@/components/ui/button";
import Error from "@/components/ui/error";
import { MAIN_PAGES } from "@/constants/pages.constants";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function Years({
  response
}: Readonly<{
  response: TResponseResult<number[]>
}>) {
  const { year: current_year } = useParams();
  const locale = useCurrentLocale();
  const router = useRouter();
  const i18n = useI18n();

  const scrollArea = useRef<HTMLElement|null>(null);
  const left_button = useRef<HTMLDivElement|null>(null);
  const right_button = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    if (response.status !== 'success')
      toast.error(i18n('errors.fetch'), {
        description: response.message[locale],
        action: {
          label: i18n('errors.actions.reload'),
          onClick: () => {
            router.refresh();
          }
        }
      })
  }, [response])

  function computeSize() {
    if (!scrollArea.current) return;

    const scrollLeft = scrollArea.current.scrollLeft;
    const scrollWidth = scrollArea.current.scrollWidth;
    const clientWidth = scrollArea.current.clientWidth;
    
    if (scrollLeft > 5) {
      left_button.current?.classList.remove("invisible")
    } else {
      left_button.current?.classList.add("invisible")
    }
    if (scrollLeft + clientWidth < scrollWidth - 5) {
      right_button.current?.classList.remove("invisible")
    } else {
      right_button.current?.classList.add("invisible")
    }
  }

  useEffect(()=>{
    computeSize();
    let resize_observer = new ResizeObserver(computeSize);
    if (scrollArea.current) {
      resize_observer.observe(scrollArea.current);
    }

    return () => {
      if (scrollArea.current) {
        resize_observer.unobserve(scrollArea.current);
      }
    }
  }, [])
  
  if (response.status !== 'success') return (
    <Error>
      {i18n('errors.fetch')}
    </Error>
  )

  const years = response.data;
  years.sort((a, b) => b - a);

  return (
    <div className="flex gap-1 relative w-full from-background to-transparent from-50%">
      <div ref={left_button} className="invisible pointer-events-none absolute py-2 left-0 pr-12 bg-gradient-to-r">
        <Button className="pointer-events-auto" variant="outline" size="icon" onClick={()=>{
          scrollArea.current?.scroll({
            left: scrollArea.current?.scrollLeft - scrollArea.current?.clientWidth/2,
            behavior: "smooth"
          })
        }}>
          <ChevronLeft />
        </Button>
      </div>
      <nav
        ref={scrollArea}
        className="flex gap-2 px-1 w-full overflow-scroll scrollbar-hide py-2"
        onScroll={computeSize}
      >
        {
          <Button key={`year_current`} variant={!current_year ? "default" : "ghost"} asChild>
            <Link href={MAIN_PAGES.HOME}>
              Активные
            </Link>
          </Button>
        }
        {
          years.map(year => (
            <Button
              key={`year_${year}`}
              variant={`${year}` === current_year ? "default" : "ghost"}
              asChild
              >
              <Link href={MAIN_PAGES.YEAR(year)}>
                {year}
              </Link>
            </Button>
          ))
        }
      </nav>
      <div ref={right_button} className="invisible pointer-events-none absolute py-2 right-0 pl-12 bg-gradient-to-l">
        <Button className="pointer-events-auto" variant="outline" size="icon" onClick={()=>{
          scrollArea.current?.scroll({
            left: scrollArea.current?.scrollLeft + scrollArea.current?.clientWidth/2,
            behavior: "smooth"
          })
        }}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
