class MainPages {
  private root = "";

  HOME = `${this.root}/`
  YEAR = (year: number) => `${this.root}/confs/${year}`
  CONF = (slug: string) => `${this.root}/${slug}`
}

export const MAIN_PAGES = new MainPages()

class AuthPages {
  private root = "";

  LOGIN = (next?: string|null) => `${this.root}/login` + (next ? `?next=${next}` : '')
  REGISTRATION = (next?: string|null) => `${this.root}/signup` + (next ? `?next=${next}` : '')
  FORGOT_PASSWORD = `${this.root}/forgot-password`
}

export const AUTH_PAGES = new AuthPages()