export interface IAuthForm {
  email: string
  password: string
}

export interface IUser {
  id: number
  email: string
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

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
