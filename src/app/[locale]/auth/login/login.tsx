'use client'

import { useAuth } from "@/components/layout/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { form_login_schema } from "@/constants/auth.constants";
import { AUTH_PAGES, MAIN_PAGES } from "@/constants/pages.constants";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { login } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Login() {
  const locale = useCurrentLocale();
  const params = useSearchParams();
  const router = useRouter();
  const { reloadAuth } = useAuth();
  const t = useI18n();

  z.setErrorMap((issue, ctx) => {
    if (issue.path[0]==='email')
      return { 
        message: ctx.data === '' ?
          t('zod_errors.auth.email.required') :
          t('zod_errors.auth.email.invalid')
      }

    if (issue.path[0]==='password')
      return { message: t('zod_errors.auth.password.required') }

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

  async function submitSignIn(data: z.infer<typeof form_login_schema>) {
    const response = await login(data.email, data.password);

    if (response.status === 'success'){
      reloadAuth();
      return router.replace(params.get('next') ?? MAIN_PAGES.PROFILE)
    }

    if(response.status === 'error')
      return toast.error(t('errors.fetch'), {
        description: response.message[locale]
      });

    toast.error(t('errors.fetch'))
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('login.title')}</CardTitle>
        <CardDescription>{t('login.description')}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Button variant="outline" className="w-full">
          {t('login.login_with_psuti')}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            {t('login.or')}
          </span>
        </div>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(submitSignIn)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{t('login.email')}</FormLabel>
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
                    <FormLabel htmlFor="password">{t('login.password')}</FormLabel>
                    <Link href={AUTH_PAGES.FORGOT_PASSWORD} className="text-sm underline">{t('login.forgot')}</Link>
                  </div>
                  <Input id="password" type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">{t('login.login')}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span>
          {t('login.no_account.title')}{" "}
          <Link href={AUTH_PAGES.REGISTRATION(params.get('next'))} className="underline">{t('login.no_account.link')}</Link> 
        </span>
      </CardFooter>
    </Card>
  )
}
