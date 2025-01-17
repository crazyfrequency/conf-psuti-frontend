import { COOKIES_ACCESS_TOKEN } from '@/constants/app.constants'
import { TUserTokenData } from '@/types/auth.types'
import { deleteCookie, getCookie, setCookie } from 'cookies-next/client'

export const getAuthToken = () => {
  return getCookie(COOKIES_ACCESS_TOKEN) ?? null
}

export const getUserData = (): TUserTokenData|null => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } catch (e) {
    console.error(e)
    return null
  }
}

export const setAuthToken = (token: string, expires?: Date) => {
  setCookie(COOKIES_ACCESS_TOKEN, token, {
    sameSite: 'strict',
    expires: expires
  })
}

export const removeAuthToken = () => {
  deleteCookie(COOKIES_ACCESS_TOKEN)
}