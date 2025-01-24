class MainPages {
  private root = "";

  HOME = `${this.root}/`
  PROFILE = `${this.root}/profile`
  YEAR = (year: number) => `${this.root}/confs/${year}`
  CONF = (slug: string) => `${this.root}/${slug}`
}

export const MAIN_PAGES = new MainPages()

function getParams(params: Readonly<Record<string, string>>) {
  const urlParams = new URLSearchParams(params);
  return urlParams ? `?${urlParams.toString()}` : '';
}

class AuthPages {
  private root = "/auth";

  LOGIN = (next?: string|null) => `${this.root}/login` + (next ? getParams({ next }) : '')
  REGISTRATION = (next?: string|null) => `${this.root}/signup` + (next ? getParams({ next }) : '')
  CONFIRM_EMAIL = (email: string, time?: number|null) => `${this.root}/confirm-email` + (time ? getParams({ email, time: time.toString() }) : getParams({ email }))
  FORGOT_PASSWORD = `${this.root}/forgot-password`
}

export const AUTH_PAGES = new AuthPages()