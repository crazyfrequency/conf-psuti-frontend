import z from 'zod'

export const form_login_schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty()
})

export const form_signup_schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8).max(32).nonempty(),
  confirm: z.string(),
  preferredLocale: z.enum(["RU", "EN"]),
  names: z.object({
    RU: z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string()
    }),
    EN: z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string()
    })
  })
}).refine(value => value.password === value.confirm, {
  path: ['confirm'],
  params: { i18n: "auth.password_mismatch" }
})