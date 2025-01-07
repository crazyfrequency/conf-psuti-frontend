/**
 * Домен для API запросов с клиента
 * При нахождении на одном домене указывать пустое значение
 */
export const SITE_DOMAIN_API = process.env.NEXT_PUBLIC_DOMAIN_API || 'http://localhost:8000';

/**
 * Домен для API запросов с сервера
 * Указать имя контейнера или хост, где расположен API
 */
export const SITE_DOMAIN_API_LOCAL = process.env.LOCAL_DOMAIN_API || 'http://localhost:8000';

/**
 * Куки для хранения токена
 * Указать имя параметра, в котором будет хранится куки
 */
export const COOKIES_ACCESS_TOKEN = process.env.NEXT_PUBLIC_COOKIES_ACCESS_TOKEN || 'access_token';

/**
 * Почта службы поддержки
 */
export const HELP_DESK_EMAIL = process.env.NEXT_PUBLIC_HELP_DESK_EMAIL || 'helpdesk@psuti.ru';

/**
 * Почта отображаемая на сайте
 */
export const MAIL = process.env.NEXT_PUBLIC_MAIL || 'nio@psuti.ru';

/**
 * Телефон отображаемый на сайте
 */
export const PHONE = process.env.NEXT_PUBLIC_PHONE || '+7 (846) 339-11-09';

const cacheModeValue = process.env.NEXT_PUBLIC_CACHE_MODE || "";

/**
 * Режим кеширования
 */
export const CACHE_MODE: RequestCache =
  ['no-cache', 'reload', 'force-cache', 'only-if-cached'].includes(cacheModeValue)
    ? cacheModeValue as RequestCache
    : 'force-cache';
