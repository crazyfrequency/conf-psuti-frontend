import { BigLocales } from "@/constants/i18n.constants"
import type { UUID } from "crypto"
import type { INames, IUser } from "./auth.types"

export interface IAdminUser {
  id: UUID
  email: string
  names: Partial<Record<BigLocales, INames>>
  permissions: number
}

export interface IUserConf {
  id: number
  slug: string
  isEnabled: boolean
  isEnglishEnabled: boolean
  conferenceNameRu: string
  conferenceNameEn?: string
  statusRu?: string
  statusEn?: string
  startDate: string|number
  endDate: string|number
  permissions: number
}

export type TUserProfile = Omit<IUser, 'conferences'> & {
  phone: string,
  country: string,
  city: string,
  homeAddress: string,
  organization: string,
  organizationAddress: string,
  organizationPosition: string,
  academicDegree: string,
  academicTitle: string,
  supervisor: string,
  conferences: IUserConf[]
}
