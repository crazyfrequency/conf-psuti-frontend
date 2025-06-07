import { object, z } from "zod";

export const form_admin = z.object({
  email: z.string().email(),
  permission: object({
    admin: z.boolean(),
    read: z.boolean(),
    write: z.boolean(),
    read_hidden_pages: z.boolean(),
    write_pages: z.boolean(),
    read_conf_app: z.boolean(),
    accept_conf_app: z.boolean(),
    create_conf_app: z.boolean(),
    read_date_conf_app: z.boolean(),
    edit_date_conf_app: z.boolean(),
    read_content_conf_app: z.boolean(),
    edit_content_conf_app: z.boolean(),
  })
})

export const form_edit_schema = z.object({
  preferredLocale: z.enum(["RU", "EN"]),
  role: z.enum(["USER", "ADMIN"]).nullable().optional(),
  emailVerified: z.boolean().nullable().optional(),
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
  }),
  phone: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  homeAddress: z.string().nullable().optional(),
  organization: z.string().nullable().optional(),
  organizationAddress: z.string().nullable().optional(),
  organizationPosition: z.string().nullable().optional(),
  academicDegree: z.string().nullable().optional(),
  academicTitle: z.string().nullable().optional(),
  supervisor: z.string().nullable().optional(),
})
