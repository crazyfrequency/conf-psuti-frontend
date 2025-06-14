import auth_errors from "./auth/errors.json";
import confs from "./confs";
import languages from "./languages.json";
import profile from "./profile.json";
import zod from "./zod.json";

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
      login: 'Login',
      logout: 'Logout',
      profile: 'Profile',
      new_confs: 'New conferences',
      users: 'Users'
    }
  },
  footer: {
    message: 'Copyright © {year} ФГБОУ ВО ПГУТИ. All rights reserved.',
    administrations: 'Contacts of administration:',
    email: 'Email:',
    phone: 'Phone:',
  },
  cookies: {
    title: 'We use cookies 🍪',
    description: 'By continuing to use our site, you agree to the use of cookies',
    accept: 'Accept'
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
    ...confs,
    info_edit: {
      title: 'Create conference',
      description: 'Fill in the form to create a new conference',
      fields: {
        slug: 'Conference address',
        title_ru: 'Conference name (Russian)',
        title_en: 'Conference name (English)',
        status_ru: 'Conference status (Russian)',
        status_en: 'Conference status (English)',
        english_enabled: 'Enable English',
        start_date: 'Start date',
        end_date: 'End date',
        enter_date: 'Pick a date',
        required: 'Required field',
        optional: 'Optional field',
        registration: 'Default date for conference closing',
        submission: 'Default date for registration closing',
      },
      cancel: 'Cancel',
      submit: 'Create conference',
      errors: {
        invalid_slug: "Conference address should contain only numbers, letters, hyphens and underscores. It should start with a letter and not contain the following words: {invalids}.",
        slug_in_use: 'This conference address is already in use',
      },
      success: 'Conference created',
    },
    new: {
      title: 'New conferences',
      create: 'Create'
    },
    info: {
      dates: 'Conference Dates',
      registration: 'Registration Due Date',
      submission: 'Paper Submission Due Date',
      place: 'Place',
      site: 'Website',
      email: 'E-mail',
      phone: 'Phone',
      letter: 'Information letter',
      organizations: 'Organizations',
      sections: 'Conference sections',
    },
    add_page: 'Add page',
    save: 'Save',
    cancel: 'Cancel',
    reset: 'Reset',
    page_enabled: {
      title: 'Enable page',
    },
    import: {
      title: 'Import settings file',
      button: 'Import',
      drop: 'Drop file here',
      select: 'Select file',
      invalid: 'Invalid file',
    },
    export: 'Export',
    saved: 'Successfully saved',
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
  confirm_email: {
    title: 'Email confirmation',
    message: 'A confirmation email has been sent to your email.',
    message_description: 'Confirm your email to access your account. If you don\'t confirm your email, your account will be deleted within 12-24 hours.',
    message_time: 'The email will be sent again in {time}',
    button: 'Resend email',
    fetch_timeout: 'You recently sent a confirmation email',
    success: {
      title: 'Email confirmed',
      description: 'Your email has been confirmed. You can now log in.'
    }
  },
  signup: {
    title: 'Sign up',
    description: 'Create an account with your email',
    email: 'Email',
    password: 'Password',
    confirm: 'Confirm password',
    lastname: 'Last name',
    firstname: 'First name',
    middlename: 'Middle name (optional)',
    names: 'Names {on}',
    preferred_locale: 'Preferred language',
    caution: {
      title: 'Caution',
      description: 'Other information can be entered later in the profile',
    },
    signup: 'Sign up',
    have_account: {
      title: 'Already have an account?',
      link: 'Login'
    }
  },
  editor: {
    placeholder: 'Start typing...'
  },
  loading: {
    fetch: 'Executing request',
    code_confirmed: 'Email confirmed'
  },
  errors: {
    fetch: 'An error occurred while executing the request',
    fetches: {
      email_in_use: {
        title: 'Email is already in use',
        description: 'You may already be registered'
      },
      auth: 'An error occurred while authorizing',
    },
    login: 'Invalid email or password',
    bad_credentials: 'Invalid email or password',
    editor: 'An error occurred in the editor: {error}',
    actions: {
      reload: 'reload',
      help: 'Help'
    },
    access: {
      forbidden: 'Access denied',
      unauthorized: 'Unauthorized access (you may have logged out)',
    },
    conferences: {
      not_found: 'Conferences not found',
      error: 'An error occurred while loading conferences',
      no_current: 'No current conferences',
    },
    pages: {
      not_found: 'Page not found',
    },
    403: {
      title: 'Access denied',
      description: 'You do not have permission to view this page'
    },
    500: {
      title: 'Internal server error',
      description: 'An internal server error occurred'
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
      lastname: 'Last name is required',
      firstname: 'First name is required'
    },
  },
  zod: {
    auth: auth_errors,
    ...zod,
    duplicated_path: 'Path must be unique',
    invalid_path: 'Invalid path'
  },
  profile,
  languages
} as const;
