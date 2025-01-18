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
  const i18n = useScopedI18n('login');
  const zod_i18n = useScopedI18n('zod_errors.auth');

  z.setErrorMap((issue, ctx) => {
    if (issue.path[0]==='email')
      return { 
        message: ctx.data === '' ?
          zod_i18n('email.required') :
          zod_i18n('email.invalid')
      }

    if (issue.path[0]==='password')
      return { message: zod_i18n('password.required') }

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
        <CardTitle className="text-xl">{i18n('title')}</CardTitle>
        <CardDescription>{i18n('description')}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Button variant="outline" className="w-full">
          {i18n('login_with_psuti')}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            {i18n('or')}
          </span>
        </div>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit((data) => console.log(data))}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">{i18n('email')}</FormLabel>
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
                    <FormLabel htmlFor="password">{i18n('password')}</FormLabel>
                    <Link href={AUTH_PAGES.FORGOT_PASSWORD} className="text-sm underline">{i18n('forgot')}</Link>
                  </div>
                  <Input id="password" type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">{i18n('login')}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <span>
          {i18n('no_account.title')}{" "}
          <Link href={AUTH_PAGES.REGISTRATION(params.get('next'))} className="underline">{i18n('no_account.link')}</Link> 
        </span>
      </CardFooter>
    </Card>
  )
}
