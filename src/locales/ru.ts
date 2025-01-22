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
    pages: {
      home: 'Главная',
      info: 'Общая информация',
    },
    create: {
      title: 'Создание конференции',
      description: 'Заполните форму для создания новой конференции',
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
  },
  signup: {
    title: 'Регистрация',
    description: 'Создайте свой аккаунт используя почту',
    email: 'Почта',
    password: 'Пароль',
    confirm: 'Подтвердите пароль',
    lastname: {
      title: 'Фамилия (RU)',
      description: 'Фамилия на русском языке'
    },
    firstname: {
      title: 'Имя (RU)',
      description: 'Имя на русском языке'
    },
    middlename: {
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
    fetch: 'Произошла ошибка при выполнении запроса',
    fetches: {
      email_in_use: {
        title: 'Такая почта уже используется',
        description: 'Возможно вы уже зарегистрированы',
      },
    },
    login: 'Неверная почта или пароль',
    actions: {
      reload: 'повтор',
      help: 'Помощь'
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
  }
} as const;
