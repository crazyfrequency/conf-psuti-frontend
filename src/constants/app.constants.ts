/**
 * Домен для API запросов с клиента
 * При нахождении на одном домене указывать /api
 */
export const SITE_DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API || 'http://localhost:8000/api';

/**
 * Домен для API запросов с сервера
 * Указать имя контейнера или хост, где расположен API
 */
export const SITE_DOMAIN_API_LOCAL = process.env.LOCAL_DOMAIN_API || 'http://localhost:8000/api';

/**
 * Домен для, где расположен фронтенд
 */
export const SITE_DOMAIN_FRONT = process.env.NEXT_PUBLIC_DOMAIN_FRONT || 'http://localhost:3000';

/**
 * Куки для хранения токена
 * Указать имя параметра, в котором будет хранится куки
 */
export const COOKIES_ACCESS_TOKEN = 'access_token';

export const TIME_ZONE = process.env.NEXT_PUBLIC_TIME_ZONE || 'UTC+04'

/**
 * Почта службы поддержки
 */
export const HELP_DESK_EMAIL = process.env.NEXT_PUBLIC_HELP_DESK_EMAIL || 'helpdesk@psuti.ru';

/**
 * Почта отображаемая на сайте
 */
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'nio@psuti.ru';

/**
 * Телефон отображаемый на сайте
 */
export const PHONE = process.env.NEXT_PUBLIC_PHONE || '+7 (846) 339-11-09';

const cacheModeValue = process.env.NEXT_PUBLIC_CACHE_MODE || "";

/**
 * Режим кеширования
 */
export const CACHE_MODE: RequestCache =
  ['default', 'no-cache', 'no-store', 'reload', 'force-cache', 'only-if-cached'].includes(cacheModeValue)
    ? cacheModeValue as RequestCache
    : 'no-cache';
