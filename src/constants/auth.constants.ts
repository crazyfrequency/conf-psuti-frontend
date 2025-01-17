import z from 'zod'

export const form_login_schema = z.object({
  email: z.string().email(),
  password: z.string().nonempty()
})

export const form_signup_schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  confirm: z.string(),
  last_name: z.string().min(4),
  first_name: z.string().min(4),
  middle_name: z.string()
}).refine(value => value.password === value.confirm, {
  message: 'not_matches',
  path: ['confirm']
})