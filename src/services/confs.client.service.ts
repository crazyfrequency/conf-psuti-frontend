'use client'

import { checkErrorsClient } from "@/api/error";
import { axiosWithAuth } from "@/api/interceptors";
import { Locales } from "@/constants/i18n.constants";
import { IPage, TConf, TConfForm, TConfPage, TConfPageContentForm, TConfPageForm, TLocalizedConfPage } from "@/types/conf.types";

const base_url = `/conferences`

export async function getConf(slug: string) {
  return checkErrorsClient(await axiosWithAuth.get<TConf>(`${base_url}/slug/${slug}`))
}

export async function getNewConfs() {
  return checkErrorsClient(await axiosWithAuth.get<TConf[]>(`${base_url}/new`))
}

export async function getConfPage(slug: string, path: string|undefined) {
  return checkErrorsClient(await axiosWithAuth.get<TConfPage>(`${base_url}/slug/${slug}/${path??"info"}`))
}

export async function getLocalizedConfPage(slug: string, path: string, locale: Locales) {
  return checkErrorsClient(await axiosWithAuth.get<TLocalizedConfPage>(`${base_url}/slug/${slug}/${path}/${locale.toUpperCase()}`))
}

export async function createConf(conf: TConfForm) {
  return checkErrorsClient(await axiosWithAuth.post<string>(base_url, conf))
}

export async function updateConfPages(slug: string, pages: TConfPageForm[]) {
  return checkErrorsClient(await axiosWithAuth.patch<string>(`${base_url}/slug/${slug}/subPages`, pages))
}

export async function updateConfPage(slug: string, path: string|undefined, page: TConfPageContentForm) {
  return checkErrorsClient(await axiosWithAuth.put<IPage>(`${base_url}/slug/${slug}/subPage/${path??"info"}`, page))
}

export async function updateConfInfo(slug: string, info: Partial<TConf>) {
  return checkErrorsClient(await axiosWithAuth.put<string>(`${base_url}/slug/${slug}/info`, info))
}
