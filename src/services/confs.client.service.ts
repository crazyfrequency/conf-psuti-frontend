'use client'

import { checkErrorsClient } from "@/api/error";
import { axiosWithAuth } from "@/api/interceptors";
import { SITE_DOMAIN_API } from "@/constants/app.constants";
import { TConf } from "@/types/conf.types";

const base_url = `${SITE_DOMAIN_API}/confs`

export async function getConf(slug: string) {
  return checkErrorsClient(await axiosWithAuth.get<TConf>(`${base_url}/${slug}`))
}