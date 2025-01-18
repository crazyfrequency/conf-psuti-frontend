export default {
  title: {
    default: 'PSUTI Conference Website',
    admin: 'Admin panel'
  },
  main_header: {
    themes: {
      hint: 'Theme settings',
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    locale_hint: 'Language settings',
    user_menu: {
      login: 'Login'
    }
  },
  footer: {
    message: 'Copyright © {year} ФГБОУ ВО ПГУТИ. All rights reserved.',
    administrations: 'Contacts of administration:',
    email: 'Email:',
    phone: 'Phone:',
  },
  confs_list: {
    current: 'Current',
    title: 'Current conferences',
    title_with_year: 'Conferences in {year}',
    description: 'List of current conferences at PSUTI',
    description_with_year: 'List of conferences at PSUTI in {year}',
    load_error: {
      years: 'Unable to load years',
      confs: 'Unable to load conferences'
    }
  },
  confs: {
    home: 'Home',
    info: 'General information'
  },
  login: {
    title: 'Login',
    description: 'Sign in with your PSUTI account',
    login_with_psuti: 'Login with PSUTI',
    or: 'Or continue with',
    email: 'Email',
    password: 'Password',
    forgot: 'Forgot password?',
    login: 'Login',
    no_account: {
      title: 'Don\'t have an account?',
      link: 'Sign up'
    }
  },
  signup: {
    title: 'Sign up',
    description: 'Create an account with your email',
    email: 'Email',
    password: 'Password',
    confirm: 'Confirm password',
    last_name: {
      title: 'Last name (RU)',
      description: 'Last name in Russian'
    },
    first_name: {
      title: 'First name (RU)',
      description: 'First name in Russian'
    },
    middle_name: {
      title: 'Middle name (RU)',
      description: 'Middle name in Russian (if applicable)'
    },
    caution: {
      title: 'Caution',
      description: 'Other details, such as full name in English, can be filled in after registration',
    },
    signup: 'Sign up',
    have_account: {
      title: 'Already have an account?',
      link: 'Login'
    }
  },
  errors: {
    fetch: 'An error occurred while fetching data',
    actions: {
      reload: 'reload',
    }
  },
  zod_errors: {
    auth: {
      email: {
        required: 'Email is required',
        invalid: 'Invalid email'
      },
      password: {
        required: 'Password is required',
        min: 'Password must be at least 8 characters',
        max: 'Password must be at most 32 characters'
      },
      confirm: 'Passwords do not match',
      last_name: 'Last name is required',
      first_name: 'First name is required'
    },
  }
} as const;
