'use client'

import { checkErrorsClient } from "@/api/error"
import { axiosWithAuth } from "@/api/interceptors"
import { IAdminUser } from "@/types/user.types"

const base_users_url = `/users`

export async function getAdmins(slug: string) {
  return checkErrorsClient(await axiosWithAuth.get<IAdminUser[]>(`/conferences/${slug}/admins`))
}

export async function saveAdmin(slug: string, admin: { email: string, permissions: number }) {
  return checkErrorsClient(await axiosWithAuth.put(`/conferences/${slug}/admins`, admin))
}

export async function deleteAdmin(slug: string, id: string) {
  return checkErrorsClient(await axiosWithAuth.delete(`/conferences/${slug}/admins/${id}`))
}
