import { useConfContext } from '@/components/layout/conf/conf-context';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ControlGroup, ControlGroupItem } from '@/components/ui/control-group';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from '@/components/ui/input-base';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import TimePicker from '@/components/ui/time-picker';
import { SITE_DOMAIN_FRONT, TIME_ZONE } from '@/constants/app.constants';
import { form_conference_info } from '@/constants/conf.constants';
import { CONF_PAGES } from '@/constants/pages.constants';
import { useLocale } from '@/hooks/date-locale.hook';
import { cn } from '@/lib/utils';
import { makeZodI18nMap } from '@/lib/zod-i18n';
import { useScopedI18n } from '@/locales/client';
import { tz } from '@date-fns/tz';
import { utc } from '@date-fns/utc';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const tzDate = tz(TIME_ZONE);

export default function EditInfo() {
  const { slug, sub_path } = useParams();
  const { dateLocale } = useLocale();
  const { data } = useConfContext();
  
  const t_edit = useScopedI18n("confs.info_edit");
  const t_info = useScopedI18n("confs.info");
  const t_zod = useScopedI18n("zod");
  const t = useScopedI18n("confs");

  const isEnglishEnabled = typeof data === "object" ? data?.isEnglishEnabled ?? false : false;

  const form_schema = form_conference_info(t_zod, isEnglishEnabled);

  const defaultData = useMemo(() => {
    if (!data || typeof data !== "object") return undefined

    return {
      ...data,
      startDate: utc(data.startDate),
      endDate: utc(data.endDate),
      closingDateForApplications: data.closingDateForApplications ? tzDate(data.closingDateForApplications) : null,
      closingDateForRegistrations: data.closingDateForRegistrations ? tzDate(data.closingDateForRegistrations) : null
    }
  }, [data]);

  const form = useForm<z.infer<typeof form_schema>>({
    resolver: zodResolver(form_schema, {errorMap: makeZodI18nMap(t_zod)}),
    defaultValues: defaultData
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor={field.name}>{t_edit('fields.slug')}</FormLabel>
                  <ControlGroup>
                    <ControlGroupItem>
                      <InputBase>
                        <InputBaseAdornment>{SITE_DOMAIN_FRONT}/</InputBaseAdornment>
                      </InputBase>
                    </ControlGroupItem>
                    <ControlGroupItem>
                      <InputBase asChild>
                        <InputBaseControl>
                          <FormControl>
                            <InputBaseInput id={field.name} {...field} />
                          </FormControl>
                        </InputBaseControl>
                      </InputBase>
                    </ControlGroupItem>
                  </ControlGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t_edit('fields.start_date')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP", { locale: dateLocale, in: utc }) : <span>{t_edit('fields.enter_date')}</span>}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent forceMount className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        timeZone="UTC"
                        locale={dateLocale}
                        selected={field.value ? utc(field.value) : undefined}
                        onSelect={v => field.onChange(v ? utc(v) : undefined)}
                        defaultMonth={field.value ? utc(field.value) : undefined}
                        disabled={{ before: utc("2010-01-01") }}
                        startMonth={utc("2010-01-01")}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>{t_edit('fields.required')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t_edit('fields.end_date')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP", { locale: dateLocale, in: utc }) : <span>{t_edit('fields.enter_date')}</span>}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent forceMount className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        timeZone="UTC"
                        locale={dateLocale}
                        selected={field.value ? utc(field.value) : undefined}
                        onSelect={v => field.onChange(v ? utc(v) : undefined)}
                        defaultMonth={field.value ? utc(field.value) : undefined}
                        disabled={{ before: utc("2010-01-01") }}
                        startMonth={utc("2010-01-01")}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>{t_edit('fields.required')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="closingDateForRegistration"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t_info('registration')}</FormLabel>
                  <Popover>
                    <div className="flex">
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal w-full rounded-r-none",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPPppp", { locale: dateLocale, in: tzDate }) : <span>{t_edit('fields.registration')}</span>}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        className="border-l-0 rounded-l-none"
                        onClick={() => field.onChange(undefined)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                    <PopoverContent forceMount className="grid w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        timeZone={TIME_ZONE}
                        locale={dateLocale}
                        selected={field.value ? tzDate(field.value) : undefined}
                        onSelect={v => field.onChange(v ? tzDate(v) : undefined)}
                        defaultMonth={field.value ? tzDate(field.value) : undefined}
                        disabled={{ before: tzDate("2010-01-01") }}
                        startMonth={tzDate("2010-01-01")}
                        autoFocus
                      />
                      <TimePicker
                        value={field.value}
                        onChange={v => field.onChange(v)}
                        locale={dateLocale}
                        in={tzDate}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>{t_edit('fields.optional')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closingDateForApplication"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t_info('submission')}</FormLabel>
                  <Popover>
                    <div className="flex">
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal w-full rounded-r-none",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPPppp", { locale: dateLocale, in: tzDate }) : <span>{t_edit('fields.submission')}</span>}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <Button
                        variant="outline"
                        size="icon"
                        type="button"
                        className="border-l-0 rounded-l-none"
                        onClick={() => field.onChange(undefined)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                    <PopoverContent forceMount className="grid w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        timeZone={TIME_ZONE}
                        locale={dateLocale}
                        selected={field.value ? tzDate(field.value) : undefined}
                        onSelect={v => field.onChange(v ? tzDate(v) : undefined)}
                        defaultMonth={field.value ? tzDate(field.value) : undefined}
                        disabled={{ before: tzDate("2010-01-01") }}
                        startMonth={tzDate("2010-01-01")}
                        autoFocus
                      />
                      <TimePicker
                        value={field.value}
                        onChange={v => field.onChange(v)}
                        locale={dateLocale}
                        in={tzDate}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>{t_edit('fields.optional')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="conferenceNameRu"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t_edit('fields.title_ru')}</FormLabel>
                  <Input {...field} placeholder={t_edit('fields.required')} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusRu"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t_edit('fields.status_ru')}</FormLabel>
                  <Input {...field} value={field.value ?? ""} placeholder={t_edit('fields.optional')} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="conferenceNameEn"
              render={({ field }) => (
                <FormItem className={isEnglishEnabled ? 'flex flex-col' : 'hidden'}>
                  <FormLabel>{t_edit('fields.title_en')}</FormLabel>
                  <Input {...field} placeholder={t_edit('fields.required')} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statusEn"
              render={({ field }) => (
                <FormItem className={isEnglishEnabled ? 'flex flex-col' : 'hidden'}>
                  <FormLabel>{t_edit('fields.status_en')}</FormLabel>
                  <Input {...field} value={field.value ?? ""} placeholder={t_edit('fields.optional')} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="webSite"
            render={({ field }) => (
              <FormItem className={isEnglishEnabled ? 'flex flex-col' : 'hidden'}>
                <FormLabel>{t_info('site')}</FormLabel>
                <Input {...field} value={field.value ?? ""} placeholder={t_edit('fields.optional')} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={isEnglishEnabled ? 'flex flex-col' : 'hidden'}>
                <FormLabel>{t_info('email')}</FormLabel>
                <Input {...field} value={field.value ?? ""} placeholder={t_edit('fields.optional')} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className={isEnglishEnabled ? 'flex flex-col' : 'hidden'}>
                <FormLabel>{t_info('phone')}</FormLabel>
                <Input {...field} value={field.value ?? ""} placeholder={t_edit('fields.optional')} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="secondary" asChild>
            <Link href={CONF_PAGES.CONF_PAGE(slug as string, sub_path as string)}>
              {t("cancel")}
            </Link>
          </Button>
          <Button
            className="cursor-pointer"
            onClick={undefined} // TODO добавить событие
          >
            {t("save")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
