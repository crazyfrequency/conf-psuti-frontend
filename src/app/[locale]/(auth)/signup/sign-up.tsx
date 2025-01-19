'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { form_signup_schema } from "@/constants/auth.constants";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useScopedI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUp() {
  const params = useSearchParams();
  const t = useScopedI18n('signup');
  const zod_t = useScopedI18n('zod_errors.auth');

  z.setErrorMap((issue, ctx) => {
    const path = issue.path[0];

    if (path === 'email')
      return { 
        message: ctx.data === '' ?
          zod_t('email.required') :
          zod_t('email.invalid')
      }

    if (path === 'password') {
      if (ctx.data === '')
        return { message: zod_t('password.required') }
      if (issue.code === 'too_small')
        return { message: zod_t('password.min') }
      if (issue.code === 'too_big')
        return { message: zod_t('password.max') }
    }

    if (path === 'confirm')
      return { message: zod_t('confirm') }

    if (path === 'last_name') {
      return { message: zod_t('last_name') }
    }

    if (path === 'first_name') {
      return { message: zod_t('first_name') }
    }

    return { message: ctx.defaultError }
  })

  const form = useForm<z.infer<typeof form_signup_schema>>({
    resolver: zodResolver(form_signup_schema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      last_name: '',
      first_name: '',
      middle_name: ''
    }
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit((data) => console.log(data))}>
            <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{t('email')}</FormLabel>
                  <Input id="email" type="email" placeholder={t('email')} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">{t('password')}</FormLabel>
                  <Input id="password" type="password" placeholder={t('password')} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirm">{t('confirm')}</FormLabel>
                  <Input id="confirm" type="password" placeholder={t('confirm')} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="last_name">{t('last_name.title')}</FormLabel>
                  <Input id="last_name" type="text" placeholder="Иванов" {...field} />
                  <FormDescription>{t('last_name.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first_name">{t('first_name.title')}</FormLabel>
                  <Input id="first_name" type="text" placeholder="Иван" {...field} />
                  <FormDescription>{t('first_name.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="middle_name">{t('middle_name.title')}</FormLabel>
                  <Input id="middle_name" type="text" placeholder="Иванович" {...field} />
                  <FormDescription>{t('middle_name.description')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert>
              <Info />
              <AlertTitle>{t('caution.title')}</AlertTitle>
              <AlertDescription>{t('caution.description')}</AlertDescription>
            </Alert>

            <Button type="submit">{t('signup')}</Button>
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
