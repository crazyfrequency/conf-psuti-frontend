'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { form_login_schema } from "@/constants/auth.constants";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useScopedI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const params = useSearchParams();
  const t = useScopedI18n('login');
  const zod_t = useScopedI18n('zod_errors.auth');

  z.setErrorMap((issue, ctx) => {
    if (issue.path[0]==='email')
      return { 
        message: ctx.data === '' ?
          zod_t('email.required') :
          zod_t('email.invalid')
      }

    if (issue.path[0]==='password')
      return { message: zod_t('password.required') }

    return {
      message: ctx.defaultError
    }
  })

  const form = useForm<z.infer<typeof form_login_schema>>({
    resolver: zodResolver(form_login_schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Button variant="outline" className="w-full">
          {t('login_with_psuti')}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            {t('or')}
          </span>
        </div>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit((data) => console.log(data))}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{t('email')}</FormLabel>
                  <Input id="email" type="email" placeholder="me@example.com" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel htmlFor="password">{t('password')}</FormLabel>
                    <Link href={AUTH_PAGES.FORGOT_PASSWORD} className="text-sm underline">{t('forgot')}</Link>
                  </div>
                  <Input id="password" type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">{t('login')}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span>
          {t('no_account.title')}{" "}
          <Link href={AUTH_PAGES.REGISTRATION(params.get('next'))} className="underline">{t('no_account.link')}</Link> 
        </span>
      </CardFooter>
    </Card>
  )
}
