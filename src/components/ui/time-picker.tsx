import { cn } from '@/lib/utils'
import { format, type ContextFn, type Locale } from 'date-fns'
import { Check, ChevronDown, Clock } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export default function TimePicker({
  className,
  onChange,
  children,
  in: tz,
  value,
  locale
}: Readonly<{
  onChange?: (value: Date) => void
  children?: React.ReactNode
  in?: ContextFn<Date>
  className?: string
  value?: Date | null,
  locale?: Locale
}>) {
  value = value ? tz ? tz(value) : value : null;
  const hour = useRef<HTMLButtonElement>(null);
  const minute = useRef<HTMLButtonElement>(null);
  const second = useRef<HTMLButtonElement>(null);

  const handleSelect = useCallback(
    (v: number, type: "hour" | "minute" | "second") => () => {
      if (!value) value = tz ? tz(new Date()) : new Date();
      let newValue = tz ? tz(value) : new Date(value);
      if (type === "hour") newValue.setHours(v);
      else if (type === "minute") newValue.setMinutes(v);
      else if (type === "second") newValue.setSeconds(v);
      if (onChange) onChange(newValue);
    },
    [value, onChange]
  );

  return (
    <Popover onOpenChange={() => setTimeout(() => {
      if (hour.current) hour.current.scrollIntoView({ behavior: "smooth", block: "center" });
      if (minute.current) minute.current.scrollIntoView({ behavior: "smooth", block: "center" });
      if (second.current) second.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50)}>
      <PopoverTrigger asChild>
        <Button className="justify-between m-2" variant="outline" size="sm">
          {children ? children : (
            <>
              <Clock />
              {value ? format(value, "ppp", { in: tz, locale }) : "--:--:--"}
              <ChevronDown />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-3 w-auto h-58 p-0 ps-1 *:pe-3 *:py-2 *:not-last:border-r">
        <div className="overflow-y-auto">
          <div className="flex grow flex-col items-stretch gap-1 py-24">
            {
              Array.from({ length: 24 }, (_, i) => (
                <Button
                  key={i}
                  size="sm"
                  ref={i === value?.getHours() ? hour : undefined}
                  className="h-8 py-1 px-2 rounded-sm"
                  variant="ghost"
                  onClick={handleSelect(i, "hour")}
                >
                  {value?.getHours() === i ? <Check className="size-4" /> : <div className="size-4"></div>}
                  {i.toString().padStart(2, '0')}
                </Button>
              ))
            }
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="flex grow flex-col items-stretch gap-1 py-24">
            {
              Array.from({ length: 60 }, (_, i) => (
                <Button
                  key={i}
                  size="sm"
                  ref={i === value?.getMinutes() ? minute : undefined}
                  className={cn("h-8 py-1 px-2", )}
                  variant="ghost"
                  onClick={handleSelect(i, "minute")}
                >
                  {value?.getMinutes() === i ? <Check className="size-4" /> : <div className="size-4"></div>}
                  {i.toString().padStart(2, '0')}
                </Button>
              ))
            }
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="flex grow flex-col items-stretch gap-1 py-24">
            {
              Array.from({ length: 60 }, (_, i) => (
                <Button
                  key={i}
                  size="sm"
                  ref={i === value?.getSeconds() ? second : undefined}
                  className={cn("h-8 py-1 px-2", )}
                  variant="ghost"
                  onClick={handleSelect(i, "second")}
                >
                  {value?.getSeconds() === i ? <Check className="size-4" /> : <div className="size-4"></div>}
                  {i.toString().padStart(2, '0')}
                </Button>
              ))
            }
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
