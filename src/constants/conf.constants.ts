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