import { AxiosResponse } from 'axios'

/**
 * выделяет сообщение из axios ответа
 * @param error ошибка
 * @returns сообщение об ошибке
 */
export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}

const codes: Record<number, Record<"ru"|"en", string> | undefined> = {
  400: {
    ru: 'Некорректные данные в запросе',
    en: 'Bad request'
  },
  401: {
    ru: 'Ошибка авторизации',
    en: 'Unauthorized'
  },
  403: {
    ru: 'Доступ запрещен',
    en: 'Forbidden'
  },
  404: {
    ru: 'Данные не найдены',
    en: 'Not found'
  },
  409: {
    ru: 'Конфликт существующих данных',
    en: 'Conflict of existing data'
  },
  422: {
    ru: 'Некорректные данные в запросе',
    en: 'Unprocessable entity'
  },
  429: {
    ru: 'Слишком много запросов',
    en: 'Too many requests'
  },
  500: {
    ru: 'Внутренняя ошибка сервера',
    en: 'Internal server error'
  },
  502: {
    ru: 'Плохой шлюз',
    en: 'Bad gateway'
  },
  503: {
    ru: 'Сервис недоступен',
    en: 'Service unavailable'
  },
  504: {
    ru: 'Время ожидания шлюза истекло',
    en: 'Gateway timeout'
  }
}

const error_codes: Record<string, Record<"ru"|"en", string> | undefined> = {
  'ERR_FR_TOO_MANY_REDIRECTS': {
    ru: 'Слишком много перенаправлений',
    en: 'Too many redirects'
  },
  'ERR_BAD_OPTION_VALUE': {
    ru: 'Было указано неправильное значение опции. Возможно, разработчики где-то ошиблись...',
    en: 'An incorrect option value was specified. Developers might have made a mistake...'
  },
  'ERR_BAD_OPTION': {
    ru: 'Было указано неправильное имя опции. Возможно, разработчики где-то ошиблись...',
    en: 'An incorrect option name was specified. Developers might have made a mistake...'
  },
  'ERR_NETWORK': {
    ru: 'Сервер недоступен',
    en: 'Server is unavailable'
  },
  'ERR_DEPRECATED': {
    ru: 'Используемый метод в запросе устарел',
    en: 'The method used in the request is deprecated'
  },
  'ERR_BAD_RESPONSE': {
    ru: 'Некорректный ответ от сервера',
    en: 'Incorrect response from server'
  },
  'ERR_BAD_REQUEST': {
    ru: 'Неправильный запрос',
    en: 'Bad request'
  },
  'ERR_NOT_SUPPORT': {
    ru: 'Метод, используемый в запросе, не поддерживается. Возможно, браузер не поддерживается',
    en: 'The method used in the request is not supported. The browser might not be supported'
  },
  'ERR_INVALID_URL': {
    ru: 'Неправильный URL. Возможно, разработчики где-то ошиблись',
    en: 'Invalid URL. Developers might have made a mistake'
  },
  'ERR_CANCELED': {
    ru: 'Запрос был отменён',
    en: 'Request was canceled'
  },
  'ECONNABORTED': {
    ru: 'Возможно, превышено время ожидания',
    en: 'Timeout likely exceeded'
  },
  'ETIMEDOUT': {
    ru: 'Превышено время ожидания',
    en: 'Timeout exceeded'
  }
};

export type TResponseSuccess<T> = {
  status: "success";
  code: number;
  data: T;
}

export type TResponseError = {
  status: "error"|"unauthorized"|"forbidden";
  code: number;
  message: Record<"ru"|"en", string>;
  errors?: any;
}

/**
 * результат запроса
 * @param T тип данных
 */
export type TResponseResult<T> = TResponseSuccess<T> | TResponseError

/**
 * функция проверки ошибок в запросах на стороне клиента
 * @param response результат axios запроса
 * @returns объект содержащий результат запроса
 */
export function checkErrorsClient<T>(response: AxiosResponse<T>|null): TResponseResult<T> {
  if (typeof response?.status === 'number') {
    if (~~(response.status / 100) === 2) {
      return {
        status: "success",
        code: response.status,
        data: response.data
      }
    }
    if (codes[response.status]) {
      return {
        status:
          response.status === 401
            ? "unauthorized" :
          response.status === 403
            ? "forbidden" : "error",
        code: response.status,
        message: codes[response.status]!,
        errors: response.data
      }
    }
    return {
      status: "error",
      code: response.status,
      message: {
        ru: 'Произошла неизвестная ошибка',
        en: 'Unknown error'
      },
      errors: response.data
    }
  } else if (typeof response?.status === "string") {
    return { 
      status: "error",
      code: -1,
      message: error_codes[response.status] ?? response.status,
      errors: response?.data
    }
  }

  const message = (response?.data as any)?.message

  const description = message
      ? typeof message === 'object'
        ? message[0]
        : message
      : typeof response?.statusText === 'string'
        ? response.statusText
        : 'Произошла неизвестная ошибка';

  return {
    status: "error",
    code: response?.status ?? -1,
    message: description,
    errors: response?.data
  }
}

/**
 * функция проверки ошибок в запросах на стороне сервера
 * @param response результат fetch
 * @returns объект содержащий результат запроса
 */
export async function checkErrorsServer<T>(response: Response|null): Promise<TResponseResult<T>> {
  if (!response) return {
    status: "error",
    code: -1,
    message: {
      ru: 'Не удалось выполнить запрос к серверу',
      en: 'Failed to make request to server'
    }
  }

  if (response.ok) {
    try {
      const data = await response.json()

      return {
        status: "success",
        code: response.status,
        data: data
      }
    } catch (e) {
      return {
        status: "error",
        code: response.status,
        message: {
          ru: 'Произошла ошибка при чтении данных',
          en: 'Failed to read data'
        }
      }
    }
  }

  if (response.status === 401) {
    return {
      status: "unauthorized",
      code: response.status,
      message: codes[response.status]!
    }
  }

  if (response.status === 403) {
    return {
      status: "forbidden",
      code: response.status,
      message: codes[response.status]!
    }
  }

  return {
    status: "error",
    code: response.status,
    message: codes[response.status] ?? {
      ru: 'Произошла неизвестная ошибка',
      en: 'Unknown error occurred'
    }
  }
}