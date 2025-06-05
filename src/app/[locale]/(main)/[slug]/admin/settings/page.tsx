'use client'

import Page403 from "@/components/auth/403";
import { useConfContext } from "@/components/layout/conf/conf-context";
import LoadingComponent from "@/components/loading-component";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { form_conference_settings } from "@/constants/conf.constants";
import { useLocale } from "@/hooks/date-locale.hook";
import { PermissionFlags } from "@/lib/user-permissions";
import { makeZodI18nMap } from "@/lib/zod-i18n";
import { useScopedI18n } from "@/locales/client";
import { updateConfSettings } from "@/services/confs.client.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Settings() {
  const { data, permissions, isLoading, reload } = useConfContext();
  const { locale, dateLocale } = useLocale();
  const t = useScopedI18n("confs");
  const t_zod = useScopedI18n("zod");
  const t_loading = useScopedI18n("loading");

  const form = useForm<z.infer<typeof form_conference_settings>>({
    resolver: zodResolver(form_conference_settings, {errorMap: makeZodI18nMap(t_zod)}),
    defaultValues: {
      applicationEditingOption: "always",
      isEnabled: false,
      isEnabledForRegistration: false,
      isEnglishEnabled: false,
      participationTypes: 0,
      supportedFileFormats: ""
    }
  });

  useEffect(() => {
    if (!data || isLoading) return;

    form.reset({
      applicationEditingOption: "always",
      isEnabled: data.isEnabled,
      isEnabledForRegistration: data.isEnabledForRegistration,
      isEnglishEnabled: data.isEnglishEnabled,
      participationTypes: data.participationTypes ?? 0,
      supportedFileFormats: data.supportedFileFormats ?? ""
    })
  }, [data, isLoading]);

  if (isLoading) return <LoadingComponent />

  if (!permissions.hasAnyRole("ADMIN") && !permissions.hasAnyPermission(PermissionFlags.ADMIN, PermissionFlags.WRITE))
    return <Page403 />

  const submitSettings = (settings: z.infer<typeof form_conference_settings>) => {
    toast.promise(
      updateConfSettings(data.slug, {
        isEnabled: settings.isEnabled,
        isEnabledForRegistration: settings.isEnabledForRegistration,
        isEnglishEnabled: settings.isEnglishEnabled,
        participationTypes: settings.participationTypes,
        supportedFileFormats: settings.supportedFileFormats,
      }).then(v => {
        if (v.status !== "success") throw v.message[locale];
        reload()
      }),
      {
        loading: t_loading("fetch"),
        success: t('saved'),
        error: (error) => error
      }
    )
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(submitSettings)} onReset={() => form.reset()}>
        <FormField
          control={form.control}
          name="isEnabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <p className="text-sm leading-none font-medium">
                  {t("settings.enabled")}
                </p>
                <FormControl>
                  <Switch {...field} value={~~field.value} checked={field.value} onCheckedChange={field.onChange} onChange={undefined} />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isEnabledForRegistration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <p className="text-sm leading-none font-medium">
                  {t("settings.registration")}
                </p>
                <FormControl>
                  <Switch {...field} value={~~field.value} checked={field.value} onCheckedChange={field.onChange} onChange={undefined} />
                </FormControl>
              </FormLabel>
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
                  {t("settings.english")}
                </p>
                <FormControl>
                  <Switch {...field} value={~~field.value} checked={field.value} onCheckedChange={field.onChange} onChange={undefined} />
                </FormControl>
              </FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supportedFileFormats"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("settings.files.title")}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="docx,doc,pdf" />
              </FormControl>
              <FormDescription>{t("settings.files.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="destructive" type="reset">{t("reset")}</Button>
          <Button className="cursor-pointer" type="submit">{t("save")}</Button>
        </div>
      </form>
    </Form>
  );
}
