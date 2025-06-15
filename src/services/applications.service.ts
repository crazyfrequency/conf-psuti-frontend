'use client'

import { checkErrorsClient } from "@/api/error"
import { axiosWithAuth } from "@/api/interceptors"
import type { IApplication } from "@/types/application.types"

export async function getConfApplications(slug: string) {
  return checkErrorsClient(await axiosWithAuth.get<IApplication[]>(`conferences/${slug}/applications`))
}

export async function getSelfConfApplications(slug: string) {
  return checkErrorsClient(await axiosWithAuth.get<IApplication[]>(`conferences/${slug}/applications/self`))
}
