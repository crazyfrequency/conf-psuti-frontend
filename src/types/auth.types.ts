export interface IAuthForm {
  email: string
  password: string
}

export interface IUser {
  id: number
  email: string
  first_name_ru: string
  last_name_ru: string
  middle_name_ru: string|null
  first_name_en: string
  last_name_en: string
  middle_name_en: string|null
}

export type TUserTokenData = {
  id: number
  sub: string
  first_name_ru?: string
  last_name_en?: string
  iat: number
  exp: number
}

export interface IAuthResponse {
  accessToken: string
}

export type TUserForm = Omit<IUser, 'id'> & { password: string, confirm: string }
