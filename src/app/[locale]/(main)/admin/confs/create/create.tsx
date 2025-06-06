'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ControlGroup, ControlGroupItem } from "@/components/ui/control-group"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from "@/components/ui/input-base"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { SITE_DOMAIN_FRONT } from "@/constants/app.constants"
import { form_conference_create_schema } from "@/constants/conf.constants"
import { ADMIN_PAGES } from "@/constants/pages.constants"
import { useLocale } from "@/hooks/date-locale.hook"
import { cn } from "@/lib/utils"
import { makeZodI18nMap } from "@/lib/zod-i18n"
import { useScopedI18n } from "@/locales/client"
import { createConf } from "@/services/confs.client.service"
import { useRouter } from "@bprogress/next"
import { utc } from "@date-fns/utc"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export default function CreateConf() {
  const { locale, dateLocale } = useLocale();
  const t = useScopedI18n('confs.info_edit')
  const t_errors = useScopedI18n('errors')
  const t_zod = useScopedI18n('zod')
  const router = useRouter();

  const schema = form_conference_create_schema(t)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema, {errorMap: makeZodI18nMap(t_zod)}),
    defaultValues: {
      slug: '',
      isEnglishEnabled: false,
      conferenceNameRu: '',
      conferenceNameEn: '',
      statusRu: '',
      statusEn: '',
    }
  });
  
  async function onSubmit(data: z.infer<typeof schema>) {
    const isEnglishEnabled = data.isEnglishEnabled;
    const response = await createConf({
      slug: data.slug,
      isEnglishEnabled,
      conferenceNameRu: data.conferenceNameRu,
      conferenceNameEn: isEnglishEnabled ? data.conferenceNameEn : undefined,
      statusRu: data.statusRu?.trim().length > 0 ? data.statusRu : undefined,
      statusEn: isEnglishEnabled
        ? data.statusEn?.trim().length > 0
          ? data.statusEn
          : undefined
        : undefined,
      startDate: format(data.startDate, 'yyyy-MM-dd', {in: utc }),
      endDate: format(data.endDate, 'yyyy-MM-dd', {in: utc }),
    });

    if (response.status === "error") {
      if (response.code === 409) {
        form.setError('slug', { message: t('errors.slug_in_use') });
        return toast.error(t('errors.slug_in_use'));
      } else {
        return toast.error(t_errors('fetch'), {
          description: response.message[locale],
        })
      }
    }

    if (response.status === "forbidden")
      return toast.error(t_errors('access.forbidden'));

    if (response.status === "unauthorized")
      return toast.error(t_errors('access.unauthorized'));

    toast.success(t('success'));
    return router.push(ADMIN_PAGES.NEW_CONFS);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel htmlFor={field.name}>{t('fields.slug')}</FormLabel>
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

        <FormField
          control={form.control}
          name="isEnglishEnabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <p className="text-sm leading-none font-medium">
                  {t('fields.english_enabled')}
                </p>
                <FormControl>
                  <Switch {...field} value={~~field.value} checked={field.value} onCheckedChange={field.onChange} onChange={undefined} />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('fields.start_date')}</FormLabel>
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
                        {field.value ? format(field.value, "PPP", { locale: dateLocale, in: utc }) : <span>{t('fields.enter_date')}</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                <FormDescription>{t('fields.required')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('fields.end_date')}</FormLabel>
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
                        {field.value ? format(field.value, "PPP", { locale: dateLocale, in: utc }) : <span>{t('fields.enter_date')}</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                <FormDescription>{t('fields.required')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="conferenceNameRu"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('fields.title_ru')}</FormLabel>
                <Input {...field} placeholder={t('fields.required')} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="statusRu"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('fields.status_ru')}</FormLabel>
                <Input {...field} placeholder={t('fields.optional')} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="conferenceNameEn"
            render={({ field }) => {
              const isEnglishEnabled = useWatch({ control: form.control, name: 'isEnglishEnabled' })

              return (
                <FormItem className={isEnglishEnabled ? 'flex flex-col' : 'hidden'}>
                  <FormLabel>{t('fields.title_en')}</FormLabel>
                  <Input {...field} placeholder={t('fields.required')} />
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="statusEn"
            render={({ field }) => {
              const isEnglishEnabled = useWatch({ control: form.control, name: 'isEnglishEnabled' })

              return (
                <FormItem className={isEnglishEnabled ? 'flex flex-col' : 'hidden'}>
                  <FormLabel>{t('fields.status_en')}</FormLabel>
                  <Input {...field} placeholder={t('fields.optional')} />
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Button
            onClick={() => router.back()}
            className="cursor-pointer"
            variant="secondary"
            type="button"
          >
            {t('cancel')}
          </Button>
          <Button className="cursor-pointer" type="submit">{t('submit')}</Button>
        </div>
      </form>
    </Form>
  )
}
