class MainPages {
	private root = "";

	HOME = `${this.root}/`
}

export const MAIN_PAGES = new MainPages()

class AuthPages {
	private root = "";

	LOGIN = `${this.root}/login`
	LOGOUT = `${this.root}/logout`
}

export const AUTH_PAGES = new AuthPages()