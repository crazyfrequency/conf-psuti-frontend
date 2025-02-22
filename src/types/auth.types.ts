import { locales } from "@/constants/i18n.constants";

export interface IAuthForm {
  email: string
  password: string
}

type Locales = Uppercase<typeof locales[number]>;

export interface INames {
  firstName: string
  lastName: string
  middleName?: string
}

export interface IUser {
  id: number
  email: string
  role: "USER" | "ADMIN",
  preferredLocale: Locales,
  names: Record<Locales, INames|undefined>
}

export type TUserTokenData = {
  sub: number
  iat: number
  exp: number
}

export interface IAuthResponse {
  accessToken: string
}

export type TUserForm = Omit<IUser, 'id'|'role'> & { password: string }
