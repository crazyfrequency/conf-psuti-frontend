'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { form_signup_schema } from "@/constants/auth.constants";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { register } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function SignUp() {
  const locale = useCurrentLocale();
  const params = useSearchParams();
  const router = useRouter();
  const t = useI18n();

  z.setErrorMap((issue, ctx) => {
    const path = issue.path[0];

    if (path === 'email')
      return {
        message: ctx.data === '' ?
          t('zod_errors.auth.email.required') :
          t('zod_errors.auth.email.invalid')
      }

    if (path === 'password') {
      if (ctx.data === '')
        return { message: t('zod_errors.auth.password.required') }
      if (issue.code === 'too_small')
        return { message: t('zod_errors.auth.password.min') }
      if (issue.code === 'too_big')
        return { message: t('zod_errors.auth.password.max') }
    }

    if (path === 'confirm')
      return { message: t('zod_errors.auth.confirm') }

    if (path === 'lastname') {
      return { message: t('zod_errors.auth.lastname') }
    }

    if (path === 'firstname') {
      return { message: t('zod_errors.auth.firstname') }
    }

    return { message: ctx.defaultError }
  })

  const form = useForm<z.infer<typeof form_signup_schema>>({
    resolver: zodResolver(form_signup_schema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      lastname: '',
      firstname: '',
      middlename: ''
    }
  })

  async function submitSignUp(data: z.infer<typeof form_signup_schema>) {
    const response = await register({
      email: data.email,
      password: data.password,
      lastnameRu: data.lastname,
      firstnameRu: data.firstname,
      middlenameRu: data.middlename
    }, locale);

    if (response.status === 'success')
      router.replace(AUTH_PAGES.CONFIRM_EMAIL(data.email, +Date.now()));
    if (response.status === 'error')
      if (response.code === 409) {
        form.setError('email', { message: t('errors.fetches.email_in_use.title') });
        toast.error(t('errors.fetches.email_in_use.title'), {
          description: t('errors.fetches.email_in_use.description'),
          action: {
            label: t('errors.actions.help'),
            onClick: () => {
              window.location.reload();
            }
          }
        });
      } else {
        toast.error(t('errors.fetch'), {
          description: response.message[locale],
        })
      }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('signup.title')}</CardTitle>
        <CardDescription>{t('signup.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(submitSignUp)}>
            <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{t('signup.email')}</FormLabel>
                  <Input id="email" type="email" placeholder={t('signup.email')} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">{t('signup.password')}</FormLabel>
                  <Input id="password" type="password" placeholder={t('signup.password')} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirm">{t('signup.confirm')}</FormLabel>
                  <Input id="confirm" type="password" placeholder={t('signup.confirm')} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastname">{t('signup.lastname.title')}</FormLabel>
                  <Input id="lastname" type="text" placeholder="Иванов" {...field} />
                  <FormDescription>{t('signup.lastname.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstname">{t('signup.firstname.title')}</FormLabel>
                  <Input id="firstname" type="text" placeholder="Иван" {...field} />
                  <FormDescription>{t('signup.firstname.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="middlename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="middlename">{t('signup.middlename.title')}</FormLabel>
                  <Input id="middlename" type="text" placeholder="Иванович" {...field} />
                  <FormDescription>{t('signup.middlename.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert>
              <Info />
              <AlertTitle>{t('signup.caution.title')}</AlertTitle>
              <AlertDescription>{t('signup.caution.description')}</AlertDescription>
            </Alert>

            <Button type="submit">{t('signup.signup')}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span>
          {t('signup.have_account.title')}{" "}
          <Link href={AUTH_PAGES.LOGIN(params.get('next'))} className="underline">{t('signup.have_account.link')}</Link>
        </span>
      </CardFooter>
    </Card>
  )
}
