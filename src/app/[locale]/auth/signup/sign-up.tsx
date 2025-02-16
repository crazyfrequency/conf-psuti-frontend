'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput, PasswordInputAdornmentToggle, PasswordInputInput } from "@/components/ui/password-input";
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
      preferredLocale: locale,
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
                  <FormLabel>{t('signup.email')}</FormLabel>
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
                <FormItem>
                  <FormLabel>{t('signup.password')}</FormLabel>
                  <PasswordInput>
                    <FormControl>
                      <PasswordInputInput autoComplete="new-password" placeholder={t('signup.password').toLowerCase()} {...field} />
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
                <FormItem>
                  <FormLabel>{t('signup.confirm')}</FormLabel>
                  <PasswordInput>
                    <FormControl>
                      <PasswordInputInput autoComplete="new-password" placeholder={t('signup.confirm').toLowerCase()} {...field} />
                    </FormControl>
                    <PasswordInputAdornmentToggle />
                  </PasswordInput>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('signup.lastname.title')}</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="family-name" placeholder="Иванов" {...field} />
                  </FormControl>
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
                  <FormLabel>{t('signup.firstname.title')}</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="given-name" placeholder="Иван" {...field} />
                  </FormControl>
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
                  <FormLabel>{t('signup.middlename.title')}</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete="additional-name" placeholder="Иванович" {...field} />
                  </FormControl>
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

            <Button className="cursor-pointer" type="submit">{t('signup.signup')}</Button>
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
