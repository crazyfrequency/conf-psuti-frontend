'use server'

import { checkErrorsServer } from "@/api/error";
import { CACHE_MODE, SITE_DOMAIN_API_LOCAL } from "@/constants/app.constants";
import { TConf } from "@/types/conf.types";

const base_url = `${SITE_DOMAIN_API_LOCAL}/conferences`

export async function getYearsList() {
  let response: Response|null = null;
  try {
    response = await fetch(`${base_url}/years`, {
      cache: CACHE_MODE,
      next: {
        revalidate: 60*60*24*30*6,
        tags: ["conf_years", "confs", "all"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return checkErrorsServer<number[]>(response);
}

export async function getConfsListByYear(year?: number) {
  let response: Response|null = null;
  try {
    response = await fetch(`${base_url}/years/${year??"current"}`, {
      cache: CACHE_MODE,
      next: {
        revalidate: year ? 60*60*24*14 : 60*60*12,
        tags: [`conf_year_${year??"current"}`, "confs", "all"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return checkErrorsServer<TConf[]>(response);
}

export async function getConfBySlug(slug: string, cache?: RequestCache) {
  let response: Response|null = null;
  try {
    response = await fetch(`${base_url}/slug/${slug}`, {
      cache: cache ?? CACHE_MODE,
      next: {
        revalidate: 60*60*24*7,
        tags: [`conf_slug_${slug}`, "confs", "all"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return checkErrorsServer<TConf>(response);
}

export async function getConfPage(slug: string, sub_path: string) {
  let response: Response|null = null;
  try {
    response = await fetch(`${base_url}/${slug}/${sub_path}`, {
      cache: CACHE_MODE,
      next: {
        revalidate: 60*60*24*7,
        tags: [`conf_slug_${slug}`, "confs", "all"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return checkErrorsServer<TConf>(response);
}