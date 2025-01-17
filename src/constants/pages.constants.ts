class MainPages {
	private root = "";

	HOME = `${this.root}/`
	YEAR = (year: number) => `${this.root}/confs/${year}`
	CONF = (slug: string) => `${this.root}/${slug}`
}

export const MAIN_PAGES = new MainPages()

class AuthPages {
	private root = "";

	LOGIN = `${this.root}/login`
	REGISTRATION = `${this.root}/signup`
  FORGOT_PASSWORD = `${this.root}/forgot-password`
}

export const AUTH_PAGES = new AuthPages()