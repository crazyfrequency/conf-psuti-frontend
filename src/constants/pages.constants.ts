import { UUID } from "crypto";

class MainPages {
  private root = "";

  HOME = `${this.root}/`
  PROFILE = `${this.root}/profile`
  PROFILE_EDIT = `${this.root}/profile/edit`
  PROFILE_CONFS = `${this.root}/profile/conferences`
  YEAR = (year: number) => `${this.root}/confs/${year}`
  CONF = (slug: string) => `${this.root}/${slug}`
  PROFILE_CHANGE_EMAIL = `${this.root}/profile/change-email`
  PROFILE_CHANGE_PASSWORD = `${this.root}/profile/change-password`
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

class AdminPages {
  private root = "/admin";

  NEW_CONFS = `${this.root}/confs/new`
  CREATE_CONF = `${this.root}/confs/create`
  USERS = (id?: UUID) => `${this.root}/users` + (id ? `/${id}` : '')
  USER_CONFS = (id: UUID) => `${this.root}/users/${id}/conferences`
  USER_EDIT = (id: UUID) => `${this.root}/users/${id}/edit`
}

export const ADMIN_PAGES = new AdminPages()

class ConfPages {
  private root = "";

  INFO_PAGE = (slug: string, edit?: boolean) => `${this.root}/${slug}` + (edit ? '/info/edit' : '')
  CONF_PAGE = (slug: string, sub_path: string|undefined, edit?: boolean) => `${this.root}/${slug}/${sub_path??"info"}` + (edit ? '/edit' : '')
  CONF_ADMIN_PAGE = (slug: string, sub_path: string) => `${this.root}/${slug}/admin/${sub_path}`
}

export const CONF_PAGES = new ConfPages()
