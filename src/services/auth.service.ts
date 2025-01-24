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

  if (response.status !== 'success') {
    removeAuthToken()
    return response
  }

  if (response.data?.accessToken) setAuthToken(response.data.accessToken)
  
  return response
}

/**
 * Регистрация нового пользователя.
 * @param data Данные формы регистрации.
 * @returns Ответ сервера с токеном авторизации.
 */
export async function register(data: TUserForm, lang: string): Promise<TResponseResult<String>> {
  const response = checkErrorsClient(
    await axiosStandard.post<String>('/auth/sign-up', data, {
      params: {
        lang
      }
    })
  )
  
  return response
}

export async function getNewToken() {
  const response = checkErrorsClient(
    await axiosStandard.post<IAuthResponse>('/auth/refresh')
  );

  if (response.status !== 'success') {
    removeAuthToken()
    return response
  }
  
  if (response.data?.accessToken) setAuthToken(response.data.accessToken)
  
  return response
}

export async function logout() {
  const response = checkErrorsClient(
    await axiosStandard.post<boolean>('/auth/sign-out')
  )
  
  if (response.status === 'success') removeAuthToken()
  
  return response
}

export async function getMe() {
  const response = checkErrorsClient(
    await axiosWithAuth.get<IUser>('/users/me')
  )
  
  return response
}

export async function getNewEmailConfirmation(email: string) {
  const response = checkErrorsClient(
    await axiosWithAuth.get<string>('/auth/confirm-email?email='+email)
  )
  
  return response
}

export async function confirmEmail(token: string) {
  const response = checkErrorsClient(
    await axiosStandard.post<string>('/auth/confirm-email?code='+token)
  )
  
  return response
}
