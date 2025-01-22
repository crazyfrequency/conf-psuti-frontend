import { checkErrorsClient, TResponseResult } from '@/api/error';
import { axiosStandard, axiosWithAuth } from '@/api/interceptors';
import { IAuthResponse, IUser, TUserForm } from '@/types/auth.types';
import { removeAuthToken, setAuthToken } from './auth-token.service';

/**
 * Авторизация пользователя.
 * @param email Логин пользователя.
 * @param password Пароль пользователя.
 * @returns Обработанный ответ сервера.
 */
export async function login(email: string, password: string): Promise<TResponseResult<IAuthResponse>> {
  const response = checkErrorsClient(
    await axiosStandard.post<IAuthResponse>('/auth/sign-in', {
      email,
      password
    })
  );

  if (response.status !== 'success') return response

  if (response.data?.accessToken) setAuthToken(response.data.accessToken)
  
  return response
}

/**
 * Регистрация нового пользователя.
 * @param data Данные формы регистрации.
 * @returns Ответ сервера с токеном авторизации.
 */
export async function register(data: TUserForm): Promise<TResponseResult<String>> {
  const response = checkErrorsClient(
    await axiosStandard.post<String>('/auth/sign-up', data)
  )
  
  return response
}

export async function getNewToken() {
  const response = await axiosStandard.post<IAuthResponse>('/auth/refresh')
  
  if (response.data?.accessToken) setAuthToken(response.data.accessToken)
  
  return response
}

export async function logout() {
  const response = await axiosStandard.post<boolean>('/auth/logout')
  
  if (response.data) removeAuthToken()
  
  return response
}

export async function getMe() {
  const response = checkErrorsClient(
    await axiosWithAuth.get<IUser>('/users/me')
  )
  
  return response
}