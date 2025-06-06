'use client'

import { checkErrorsClient } from "@/api/error"
import { axiosWithAuth } from "@/api/interceptors"
import { IUser } from "@/types/auth.types"
import type { IAdminUser, IUserConf, TUserProfile } from "@/types/user.types"
import { UUID } from "crypto"

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

export async function getMyProfile() {
  return checkErrorsClient(await axiosWithAuth.get<TUserProfile>(`${base_users_url}/me/profile`))
}

export async function getMyConferences() {
  return checkErrorsClient(await axiosWithAuth.get<IUserConf[]>(`${base_users_url}/me/conferences`))
}

export async function getAllUsers() {
  return checkErrorsClient(await axiosWithAuth.get<IUser[]>(`${base_users_url}`))
}

export async function getUserById(id: UUID) {
  return checkErrorsClient(await axiosWithAuth.get<TUserProfile>(`${base_users_url}/${id}`))
}
