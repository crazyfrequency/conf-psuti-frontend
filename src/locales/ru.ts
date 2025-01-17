export default {
  title: {
    default: 'Сайт конференций ПГУТИ'
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
      login: 'Войти'
    }
  },
  footer: {
    message: 'Copyright © {year} ФГБОУ ВО ПГУТИ. Все права защищены.',
    administrations: 'Контакты администрации:',
    email: 'Почта:',
    phone: 'Телефон:',
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
    home: 'Главная',
    info: 'Общая информация'
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
  signup: {
    title: 'Регистрация',
    description: 'Создайте свой аккаунт используя почту',
    email: 'Почта',
    password: 'Пароль',
    confirm: 'Подтвердите пароль',
    last_name: {
      title: 'Фамилия (RU)',
      description: 'Фамилия на русском языке'
    },
    first_name: {
      title: 'Имя (RU)',
      description: 'Имя на русском языке'
    },
    middle_name: {
      title: 'Отчество (RU)',
      description: 'Отчество на русском языке (при наличии)'
    },
    caution: {
      title: 'Внимание',
      description: 'Остальные данные, такие как ФИО на английском языке, можно будет заполнить после регистрации'
    },
    signup: 'Зарегистрироваться',
    have_account: {
      title: 'Уже есть аккаунт?',
      link: 'Вход'
    }
  },
  errors: {
    fetch: 'Произошла ошибка при получении данных',
    actions: {
      reload: 'повтор',
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
      last_name: 'Введите фамилию',
      first_name: 'Введите имя'
    }
  }
} as const;
