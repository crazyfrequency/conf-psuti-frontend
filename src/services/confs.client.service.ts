'use client'

import { checkErrorsClient } from "@/api/error";
import { axiosWithAuth } from "@/api/interceptors";
import { SITE_DOMAIN_API } from "@/constants/app.constants";
import { TConf, TConfForm } from "@/types/conf.types";

const base_url = `${SITE_DOMAIN_API}/conferences`

export async function getConf(slug: string) {
  return checkErrorsClient(await axiosWithAuth.get<TConf>(`${base_url}/slug/${slug}`))
}

export async function getNewConfs() {
  return checkErrorsClient(await axiosWithAuth.get<TConf[]>(`${base_url}/new`))
}

export async function createConf(conf: TConfForm) {
  return checkErrorsClient(await axiosWithAuth.post<string>(base_url, conf))
}
