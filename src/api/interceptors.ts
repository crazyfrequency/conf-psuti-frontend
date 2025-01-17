import { SITE_DOMAIN_API } from '@/constants/app.constants'
import { getAuthToken, removeAuthToken } from '@/services/auth-token.service'
import { getNewToken } from '@/services/auth.service'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'

// конфиг axios
const options: CreateAxiosDefaults = {
  baseURL: SITE_DOMAIN_API,
  withCredentials: true
}

// axios без авторизации
const axiosStandard = axios.create(options)
// axios с авторизацией
const axiosWithAuth = axios.create(options)

// добавление токена в запрос
axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAuthToken()

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

// проверка на устаревание токена и обновление + обработка ошибок
axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await getNewToken()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeAuthToken()
      }
    }

    return error?.response ?? error
  }
)

// обработка ошибок
axiosStandard.interceptors.response.use(
  config => config,
  error => error?.response ?? error
)

export { axiosStandard, axiosWithAuth }

