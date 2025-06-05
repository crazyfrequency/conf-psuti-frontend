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