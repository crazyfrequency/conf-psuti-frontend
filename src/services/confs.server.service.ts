'use server'

import { checkErrorsServer } from "@/api/error";
import { CACHE_MODE, SITE_DOMAIN_API_LOCAL } from "@/constants/app.constants";
import { TConf } from "@/types/conf.types";

const base_url = `${SITE_DOMAIN_API_LOCAL}/confs`

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

export async function getConfsList(year?: number) {
  let response: Response|null = null;
  try {
    response = await fetch(`${base_url}/years/${year??"current"}`, {
      next: {
        revalidate: 60*60*24*14,
        tags: [`conf_year_${year??"current"}`, "confs", "all"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return checkErrorsServer<TConf[]>(response);
}

export async function getConf(slug: string) {
  let response: Response|null = null;
  try {
    response = await fetch(`${base_url}/${slug}`, {
      next: {
        revalidate: 60*60*24*7,
        tags: ["confs", "all"]
      }
    });
  } catch (error) {
    console.error(error);
  }
  return checkErrorsServer<TConf>(response);
}