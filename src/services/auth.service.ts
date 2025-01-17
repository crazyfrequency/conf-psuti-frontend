import { checkErrorsClient, TResponseResult } from '@/api/error';
import { axiosStandard } from '@/api/interceptors';
import { IAuthForm, IAuthResponse } from '@/types/auth.types';
import { removeAuthToken, setAuthToken } from './auth-token.service';

/**
 * Авторизация пользователя.
 * @param login Логин пользователя.
 * @param password Пароль пользователя.
 * @returns Обработанный ответ сервера.
 */
export async function login(login: string, password: string): Promise<TResponseResult<IAuthResponse>> {
  const response = checkErrorsClient(
    await axiosStandard.post<IAuthResponse>('/auth/login', {
      login,
      password
    }).catch(() => null)
  );

  if (response.status !== 'success') return response

  if (response.data?.accessToken) setAuthToken(response.data.accessToken)
  
  return response
}

/**
 * Регистрация нового пользователя.
 * @param data Данные формы регистрации.
 * @returns Ответ сервера с токеном авторизации.
 * @throws Ошибка, если запрос не удался.
 */
export async function register(data: IAuthForm): Promise<TResponseResult<boolean>> {
  const response = checkErrorsClient(
    await axiosStandard.post<boolean>('/auth/register', data)
  )
  
  return response
}

export async function getNewToken() {
  const response = await axiosStandard.get<IAuthResponse>('/auth/refresh')
  
  if (response.data?.accessToken) setAuthToken(response.data.accessToken)
  
  return response
}

export async function logout() {
  const response = await axiosStandard.post<boolean>('/auth/logout')
  
  if (response.data) removeAuthToken()
  
  return response
}