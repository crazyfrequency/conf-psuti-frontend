import z from 'zod';
import { locales } from './i18n.constants';

const invalids = 'auth, admin, confs, api, uploads, ' + locales.join(', ');

export const form_conference_create_schema = (t: any) => z.object({
  slug: z.string().max(255).regex(
    /^(?!auth$|admin$|confs$|api$|uploads$)[A-Za-z][A-Za-z0-9-_]*$/,
    t('errors.invalid_slug', { invalids })
  ).refine(v => !locales.includes(v as any), {
    message: t('errors.invalid_slug', { invalids })
  }),
  conferenceNameRu: z.string().max(255).trim().nonempty(),
  conferenceNameEn: z.string().max(255),
  statusRu: z.string().max(255),
  statusEn: z.string().max(255),
  isEnglishEnabled: z.boolean(),
  startDate: z.date(),
  endDate: z.date(),
}).superRefine((value, ctx) => {
  if (value.isEnglishEnabled && value.conferenceNameEn.trim().length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_small,
      minimum: 1,
      path: ['conferenceNameEn'],
      type: 'string',
      inclusive: true
    });
  }
})

export const form_conference_pages = (t: any, eng: boolean) => z.object({
  pages: z.array(z.object({
    id: z.number(),
    old_id: z.number().nullable(),
    editable: z.boolean(),
    pageNameRu: z.string().trim().nonempty(),
    pageNameEn: eng ? z.string().trim().nonempty() : z.string().nullable(),
    path: z.string().max(255).regex(
      /^(?!admin$)[A-Za-z][A-Za-z0-9-_]*$/,
      t('errors.invalid_path')
    )
  })).refine(pages => {
    const paths = pages.map(page => page.path);
    const uniquePaths = new Set(paths);
    return paths.length === uniquePaths.size;
  }, t('errors.duplicated_path'))
})

export const form_conference_pages_import = z.object({
  conf_id: z.number(),
  conf_slug: z.string(),
  pages: z.array(z.object({
    id: z.number(),
    old_id: z.number().nullable(),
    editable: z.boolean(),
    pageNameRu: z.string().trim().nonempty(),
    pageNameEn: z.string().trim().nonempty(),
    path: z.string().max(255)
  }))
}).passthrough()

export const form_conference_info = (t: any, eng: boolean) => z.object({
  slug: z.string().max(255).regex(
    /^(?!auth$|admin$|confs$|api$|uploads$)[A-Za-z][A-Za-z0-9-_]*$/,
    t('errors.invalid_slug', { invalids })
  ).refine(v => !locales.includes(v as any), {
    message: t('errors.invalid_slug', { invalids })
  }),
  conferenceNameRu: z.string().max(255).trim().nonempty(),
  conferenceNameEn: z.string().max(255).optional().nullable(),
  statusRu: z.string().max(255).nullable(),
  statusEn: z.string().max(255).nullable(),
  startDate: z.date(),
  endDate: z.date(),
  meetingPointRu: z.string().max(255).nullable(),
  meetingPointEn: z.string().max(255).nullable(),
  webSite: z.string().max(255).nullable(),
  email: z.string().email().max(255).nullable(),
  phone: z.string().max(255).nullable(),
  closingDateForApplication: z.date().optional(),
  closingDateForRegistration: z.date().optional(),
}).superRefine((value, ctx) => {
  if (eng && (value.conferenceNameEn?.trim?.().length ?? 0) === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_small,
      minimum: 1,
      path: ['conferenceNameEn'],
      type: 'string',
      inclusive: true
    });
  }
})

export const form_conference_settings = z.object({
  isEnabledForRegistration: z.boolean(),
  isEnglishEnabled: z.boolean(),
  isEnabled: z.boolean(),
  applicationEditingOption: z.enum(['always', 'accept_reject', 'end_date', 'accept_reject_end_date']),
  participationTypes: z.number(),
  supportedFileFormats: z.string().max(255),
})

export const form_conference_sections = (english: boolean) => z.object({
  sections: z.array(z.object({
    id: z.number().nullable(),
    isDefault: z.boolean(),
    sectionNameRu: z.string().trim().nonempty(),
    sectionNameEn: english ? z.string().trim().nonempty() : z.string().optional().nullable(),
    placeRu: z.string().optional().nullable(),
    placeEn: z.string().optional().nullable(),
  }))
})

export const form_conference_sections_import = z.object({
  conf_id: z.number(),
  conf_slug: z.string(),
  sections: z.array(z.object({
    id: z.number().nullable(),
    sectionNameRu: z.string().trim().nonempty(),
    sectionNameEn: z.string().optional().nullable(),
    placeRu: z.string().optional().nullable(),
    placeEn: z.string().optional().nullable(),
  }).passthrough())
}).passthrough()
