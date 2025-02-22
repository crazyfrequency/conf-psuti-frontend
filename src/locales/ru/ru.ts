import auth_errors from "./auth/errors.json";
import languages from "./languages.json";
import profile from "./profile.json";
import zod from "./zod.json";

export default {
  title: {
    default: 'Сайт конференций ПГУТИ',
    admin: 'Панель администратора'
  },
  main_header: {
    themes: {
      hint: 'Настройки темы',
      light: 'Светлая',
      dark: 'Тёмная',
      system: 'Системная'
    },
    locale_hint: 'Настройки языка',
    user_menu: {
      login: 'Войти',
      logout: 'Выход',
      profile: 'Профиль',
      new_confs: 'Новые конференции',
      users: 'Пользователи'
    }
  },
  footer: {
    message: 'Copyright © {year} ФГБОУ ВО ПГУТИ. Все права защищены.',
    administrations: 'Контакты администрации:',
    email: 'Почта:',
    phone: 'Телефон:',
  },
  cookies: {
    title: 'Мы используем cookies 🍪',
    description: 'Продолжая использовать наш сайт, вы соглашаетесь с использованием cookies',
    accept: 'Принять'
  },
  confs_list: {
    current: 'Текущие',
    title: 'Текущие конференции',
    title_with_year: 'Конференции в {year}',
    description: 'Список текущих конференций ПГУТИ',
    description_with_year: 'Список конференций ПГУТИ в {year}',
    load_error: {
      years: 'Не удалось загрузить года',
      confs: 'Не удалось загрузить список конференций'
    }
  },
  confs: {
    pages: {
      home: 'Главная',
      info: 'Общая информация',
    },
    create: {
      title: 'Создание конференции',
      description: 'Заполните форму для создания новой конференции',
      fields: {
        slug: 'Адрес конференции',
        title_ru: 'Название конференции (русский)',
        title_en: 'Название конференции (английский)',
        status_ru: 'Статус конференции (русский)',
        status_en: 'Статус конференции (английский)',
        english_enabled: 'Включить английский язык',
        start_date: 'Дата начала',
        end_date: 'Дата окончания',
        enter_date: 'Выберите дату',
        required: 'Обязательное поле',
        optional: 'Необязательное поле',
      },
      cancel: 'Отменить',
      submit: 'Создать конференцию',
      errors: {
        invalid_slug: "Поле Адрес сайта конференции должно содержать цифры, буквы латинского алфавита, дефисы и подчеркивания. Также начинаться с буквы и не должно содержать следующие слова: {invalids}.",
        slug_in_use: 'Этот адрес уже занят',
      },
      success: 'Конференция успешно создана',
    },
    new: {
      title: 'Новые конференции',
      create: 'Создать'
    },
    info: {
      dates: 'Даты проведения',
      registration: 'Дата окончания регистрации',
      submission: 'Дата окончания принятия докладов',
      place: 'Место проведения',
      site: 'Веб-сайт',
      email: 'E-mail',
      phone: 'Телефон',
    }
  },
  login: {
    title: 'Вход',
    description: 'Войдите в свой аккаунт ПГУТИ',
    login_with_psuti: 'Вход через ПГУТИ',
    or: 'Или продолжите с',
    email: 'Почта',
    password: 'Пароль',
    forgot: 'Забыли пароль?',
    login: 'Войти',
    no_account: {
      title: 'Нет аккаунта?',
      link: 'Регистрация'
    }
  },
  confirm_email: {
    title: 'Подтверждение почты',
    message: 'На почту было отправлено письмо для подтверждения.',
    message_description: 'Подтвердите свою почту, чтобы получить доступ к аккаунту. Если не подтвердить почту, аккаунт будет удален в течении 12-24 часов.',
    button: 'Отправить письмо повторно',
    fetch_timeout: 'Недавно вы уже отправляли письмо',
    success: {
      title: 'Почта подтверждена',
      description: 'Ваша почта была подтверждена. Теперь вы можете войти.'
    }
  },
  signup: {
    title: 'Регистрация',
    description: 'Создайте свой аккаунт используя почту',
    email: 'Почта',
    password: 'Пароль',
    confirm: 'Подтвердите пароль',
    lastname: 'Фамилия',
    firstname: 'Имя',
    middlename: 'Отчество (необязательно)',
    names: 'ФИО {on}',
    preferred_locale: 'Предпочитаемый язык',
    caution: {
      title: 'Внимание',
      description: 'Остальные данные можно будет указать после регистрации в профиле',
    },
    signup: 'Зарегистрироваться',
    have_account: {
      title: 'Уже есть аккаунт?',
      link: 'Вход'
    }
  },
  errors: {
    fetch: 'Произошла ошибка при выполнении запроса',
    fetches: {
      email_in_use: {
        title: 'Такая почта уже используется',
        description: 'Возможно вы уже зарегистрированы',
      },
      auth: 'Не удалось выполнить запрос на авторизацию'
    },
    login: 'Неверная почта или пароль',
    actions: {
      reload: 'повтор',
      help: 'Помощь'
    },
    access: {
      forbidden: 'Доступ запрещён',
      unauthorized: 'Неавторизованный доступ (возможно вы вышли из аккаунта)',
    },
    conferences: {
      not_found: 'Конференции не найдены',
      error: 'Произошла ошибка при загрузке конференций',
      no_current: 'Нет текущих конференций',
    },
    403: {
      title: 'Доступ запрещён',
      description: 'У вас нет прав на просмотр данной страницы'
    },
    500: {
      title: 'Внутренняя ошибка сервера',
      description: 'Произошла внутренняя ошибка сервера'
    }
  },
  zod_errors: {
    auth: {
      email: {
        required: 'Введите почту',
        invalid: 'Некорректная почта'
      },
      password: {
        required: 'Введите пароль',
        min: 'Минимальная длина 8 символов',
        max: 'Максимальная длина 32 символов'
      },
      confirm: 'Пароли не совпадают',
      lastname: 'Введите фамилию',
      firstname: 'Введите имя'
    }
  },
  zod: {
    auth: auth_errors,
    ...zod
  },
  profile,
  languages
} as const;
