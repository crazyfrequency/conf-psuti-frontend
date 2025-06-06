import type { BigLocales } from "@/constants/i18n.constants";
import type { UUID } from "crypto";

/**
 * Интерфейс, представляющий данные для аутентификации (форма входа).
 */
export interface IAuthForm {
  email: string
  password: string
}

/**
 * Интерфейс для представления имени пользователя.
 * Содержит имя, фамилию и, опционально, отчество.
 */
export interface INames {
  firstName: string
  lastName: string
  middleName?: string
}

/**
 * Интерфейс, представляющий разрешения на уровне конференции для пользователя.
 * Включает идентификатор конференции, её slug и битовые разрешения.
 */
export interface IConfPermissions {
  id: number
  slug: string
  permissions: number
}

/**
 * Тип, представляющий возможные роли пользователя.
 * Роли могут быть "USER" или "ADMIN".
 */
export type TRole = "USER" | "ADMIN"

/**
 * Интерфейс, представляющий данные пользователя.
 * Включает основную информацию о пользователе, его роль, локаль и разрешения на конференции.
 */
export interface IUser {
  id: UUID
  email: string
  role: TRole,
  psutiUsername: string,
  preferredLocale: BigLocales,
  names: Partial<Record<BigLocales, INames>>,
  conferences: IConfPermissions[]
}

/**
 * Тип, представляющий данные токена пользователя.
 * Включает почту субъекта, время создания и время истечения токена.
 */
export type TUserTokenData = {
  sub: string
  iat: number
  exp: number
}

/**
 * Интерфейс для представления ответа от сервера после аутентификации.
 * Содержит access token пользователя.
 */
export interface IAuthResponse {
  accessToken: string
}

/**
 * Тип, представляющий данные формы регистрации пользователя.
 * Включает все поля из `IUser`, за исключением `id` и `role`, а также пароль.
 */
export type TUserForm = Omit<IUser, 'id'|'role'> & { password: string }
