'use client'

import { PermissionFlags } from "@/lib/user-permissions";
import { useScopedI18n } from "@/locales/client";

function hasPermission(permission: number, flag: PermissionFlags) {
  return Boolean(permission & (1 << flag));
}

export default function useUserPermissions(userPermissions: number) {
  const t = useScopedI18n("confs.admins");
  
  const isAdmin = hasPermission(userPermissions, PermissionFlags.ADMIN);

  let permissions = "";
  permissions += isAdmin ? t('permission.admin') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.READ) ? t('permission.read') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.WRITE) ? t('permission.write') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.READ_HIDDEN_PAGES) ? t('permission.read_hidden_pages') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.WRITE_PAGES) ? t('permission.write_pages') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.READ_CONF_APP) ? t('permission.read_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.ACCEPT_CONF_APP) ? t('permission.accept_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.CREATE_CONF_APP) ? t('permission.create_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.READ_DATE_CONF_APP) ? t('permission.read_date_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.EDIT_DATE_CONF_APP) ? t('permission.edit_date_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.READ_CONTENT_CONF_APP) ? t('permission.read_content_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(userPermissions, PermissionFlags.EDIT_CONTENT_CONF_APP) ? t('permission.edit_content_conf_app') + ", " : "";
  
  return permissions.slice(0, -2);
}