import { TAuthContext } from "@/components/layout/providers/auth-provider";
import { TRole } from "@/types/auth.types";

/**
 * Перечисление флагов разрешений для пользователя.
 */
export enum PermissionFlags {
  READ = 0,
  WRITE = 1,
  ADMIN = 3,
  READ_HIDDEN_PAGES = 4,
  WRITE_PAGES = 5,
  READ_CONF_APP = 6,
  CREATE_CONF_APP = 7,
  ACCEPT_CONF_APP = 8,
  READ_DATE_CONF_APP = 9,
  EDIT_DATE_CONF_APP = 10,
  READ_CONTENT_CONF_APP = 11,
  EDIT_CONTENT_CONF_APP = 12
}

/**
 * Класс, представляющий разрешения пользователя на уровне конференции.
 * Инкапсулирует логику проверки ролей и разрешений пользователя для определённой конференции.
 */
export class UserConferencePermissions {
  private role?: TRole
  private permissions?: number

  /**
   * Конструктор для инициализации экземпляра класса на основе данных пользователя и slug конференции.
   * @param user Данные пользователя, полученные из контекста аутентификации.
   * @param slug Идентификатор конференции, для которой проверяются разрешения.
   */
  constructor(user?: TAuthContext["user"], slug?: string) {
    if (!(typeof user === "object") || !user) return;

    if (user.role) this.role = user.role;

    if (user.conferences?.length)
      this.permissions = user.conferences
        .find(conf => conf?.slug === slug)?.permissions
  }

  /**
   * Проверяет, есть ли у пользователя хотя бы одна из переданных ролей.
   * @param roles Роли, которые проверяются.
   * @returns Возвращает true, если у пользователя хотя бы одна из ролей.
   */
  public hasAnyRole(...roles: TRole[]): boolean {
    return roles.some(role => this.role === role);
  }

  /**
   * Проверяет, есть ли у пользователя указанное разрешение.
   * @param permission Разрешение для проверки.
   * @returns Возвращает true, если у пользователя есть указанное разрешение.
   */
  private hasPermission(permission: PermissionFlags): boolean {
    if (!this.permissions) return false;
    return Boolean(this.permissions & (1 << permission));
  }

  /**
   * Проверяет, есть ли у пользователя хотя бы одно из переданных разрешений.
   * @param permissions Разрешения, которые проверяются.
   * @returns Возвращает true, если у пользователя хотя бы одно из разрешений.
   */
  public hasAnyPermission(...permissions: PermissionFlags[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  /**
   * Проверяет, есть ли у пользователя все переданные разрешения.
   * @param permissions Разрешения, которые проверяются.
   * @returns Возвращает true, если у пользователя все переданные разрешения.
   */
  public hasAllPermissions(...permissions: PermissionFlags[]): boolean {
    return permissions.every(permission => this.hasPermission(permission));
  }
}