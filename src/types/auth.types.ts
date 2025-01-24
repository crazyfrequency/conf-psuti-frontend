export interface IAuthForm {
  email: string
  password: string
}

export interface IUser {
  id: number
  email: string
  role: "USER" | "ADMIN"
  lastnameRu?: string
  lastnameEn?: string
  firstnameRu: string
  firstnameEn?: string
  middlenameRu: string
  middlenameEn?: string
}

export type TUserTokenData = {
  sub: number
  iat: number
  exp: number
}

export interface IAuthResponse {
  accessToken: string
}

export type TUserForm = Omit<IUser, 'id'|'firstnameEn'|'middlenameEn'|'lastnameEn'|'role'> & { password: string }
