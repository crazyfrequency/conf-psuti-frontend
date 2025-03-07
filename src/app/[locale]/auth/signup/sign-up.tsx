'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput, PasswordInputAdornmentToggle, PasswordInputInput } from "@/components/ui/password-input";
import { RadioCardGroup, RadioGroupItem } from "@/components/ui/RadioCardGroup";
import { Separator } from "@/components/ui/separator";
import { form_signup_schema } from "@/constants/auth.constants";
import { BigLocales } from "@/constants/i18n.constants";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { makeZodI18nMap } from "@/lib/zod-i18n";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { register } from "@/services/auth.service";
import { useRouter } from "@bprogress/next";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignUp() {
  const t_locales = useScopedI18n('languages');
  const t_error = useScopedI18n('errors');
  const t_zod = useScopedI18n('zod');
  const t = useScopedI18n('signup');
  const locale = useCurrentLocale();
  const params = useSearchParams();
  const router = useRouter();

  z.setErrorMap(makeZodI18nMap(t_zod));

  const form = useForm<z.infer<typeof form_signup_schema>>({
    resolver: zodResolver(form_signup_schema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      preferredLocale: locale.toUpperCase() as BigLocales,
      names: {
        RU: {
          firstName: '',
          middleName: '',
          lastName: ''
        },
        EN: {
          firstName: '',
          middleName: '',
          lastName: ''
        }
      }
    }
  })

  async function submitSignUp(data: z.infer<typeof form_signup_schema>) {
    const response = await register({
      email: data.email,
      password: data.password,
      preferredLocale: locale.toUpperCase() as BigLocales,
      names: {

      }
    } as any, locale);

    if (response.status === 'success')
      router.replace(AUTH_PAGES.CONFIRM_EMAIL(data.email, +Date.now()));
    if (response.status === 'error')
      if (response.code === 409) {
        form.setError('email', { message: t_error('fetches.email_in_use.title') });
        toast.error(t_error('fetches.email_in_use.title'), {
          description: t_error('fetches.email_in_use.description'),
          action: {
            label: t_error('actions.help'),
            onClick: () => {
              window.location.reload();
            }
          }
        });
      } else {
        toast.error(t_error('fetch'), {
          description: response.message[locale],
        })
      }
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(submitSignUp)}>
            <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-0.5">
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" placeholder="me@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-0.5">
                  <FormLabel>{t('password')}</FormLabel>
                  <PasswordInput>
                    <FormControl>
                      <PasswordInputInput autoComplete="new-password" placeholder={t('password').toLowerCase()} {...field} />
                    </FormControl>
                    <PasswordInputAdornmentToggle />
                  </PasswordInput>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem className="grid gap-0.5">
                  <FormLabel>{t('confirm')}</FormLabel>
                  <PasswordInput>
                    <FormControl>
                      <PasswordInputInput autoComplete="new-password" placeholder={t('confirm').toLowerCase()} {...field} />
                    </FormControl>
                    <PasswordInputAdornmentToggle />
                  </PasswordInput>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredLocale"
              render={({ field }) => (
                <FormItem className="grid gap-0.5">
                  <FormLabel>{t('preferred_locale')}</FormLabel>
                  <FormControl>
                    <RadioCardGroup className="grid-cols-2" value={field.value} onValueChange={field.onChange}>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="RU">
                            {t_locales('names.ru')}
                          </RadioGroupItem>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="EN">
                            {t_locales('names.en')}
                          </RadioGroupItem>
                        </FormControl>
                      </FormItem>
                    </RadioCardGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
              <div className="grid gap-4">
                <Label className="text-center font-bold">{t('names', { on: t_locales('context.ru') })}</Label>
                <FormField 
                  control={form.control}
                  name="names.RU.lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-0.5">
                      <FormLabel>{t('lastname')}</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="family-name" placeholder="Иванов" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="names.RU.firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-0.5">
                      <FormLabel>{t('firstname')}</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="given-name" placeholder="Иван" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="names.RU.middleName"
                  render={({ field }) => (
                    <FormItem className="grid gap-0.5">
                      <FormLabel>{t('middlename')}</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="additional-name" placeholder="Иванович" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="max-md:hidden" orientation="vertical" />
              <div className="grid gap-4">
                <Label className="text-center font-bold max-md:mt-4">{t('names', { on: t_locales('context.en') })}</Label>
                <FormField 
                  control={form.control}
                  name="names.EN.lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-0.5">
                      <FormLabel>{t('lastname')}</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="family-name" placeholder="Ivanov" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="names.EN.firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-0.5">
                      <FormLabel>{t('firstname')}</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="given-name" placeholder="Ivan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="names.EN.middleName"
                  render={({ field }) => (
                    <FormItem className="grid gap-0.5">
                      <FormLabel>{t('middlename')}</FormLabel>
                      <FormControl>
                        <Input type="text" autoComplete="additional-name" placeholder="Ivanovich" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Alert>
              <Info />
              <AlertTitle>{t('caution.title')}</AlertTitle>
              <AlertDescription>{t('caution.description')}</AlertDescription>
            </Alert>

            <Button className="cursor-pointer" type="submit">{t('signup')}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span>
          {t('have_account.title')}{" "}
          <Link href={AUTH_PAGES.LOGIN(params.get('next'))} className="underline">{t('have_account.link')}</Link>
        </span>
      </CardFooter>
    </Card>
  )
}
