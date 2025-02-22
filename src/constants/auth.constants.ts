import z from 'zod'

export const form_login_schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty()
})

export const form_signup_schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8).max(32).nonempty(),
  confirm: z.string(),
  firstname: z.string().nonempty().max(50),
  lastname: z.string().nonempty().max(100),
  middlename: z.string().max(50),
}).refine(value => value.password === value.confirm, {
  path: ['confirm']
})