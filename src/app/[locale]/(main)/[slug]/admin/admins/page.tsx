'use client'

import Page403 from "@/components/auth/403";
import Page500 from "@/components/auth/500";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { useAuth } from "@/components/layout/providers/auth-provider";
import LoadingComponent from "@/components/loading-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { form_admin } from "@/constants/users.constants";
import useConfAdminsHook from "@/hooks/conf-admins-hook";
import { getAdminNames } from "@/lib/localalization-tools";
import { PermissionFlags } from "@/lib/user-permissions";
import { makeZodI18nMap } from "@/lib/zod-i18n";
import { useCurrentLocale, useI18n, useScopedI18n } from "@/locales/client";
import { saveAdmin } from "@/services/user.service";
import type { IAdminUser } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UUID } from "crypto";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function DialogForm({
  isEdit = false,
  admin,
  onSubmit = () => {}
}: Readonly<{
  isEdit?: boolean,
  admin?: IAdminUser
  onSubmit?: (data: z.infer<typeof form_admin>) => Promise<void>|void
}>) {
  const t_admins = useScopedI18n("confs.admins");
  const t = useScopedI18n("confs");
  const t_zod = useScopedI18n("zod");

  const permissions = useMemo(() => admin?.permissions ?? 0, [admin?.permissions]);

  const form = useForm<z.infer<typeof form_admin>>({
    resolver: zodResolver(form_admin, { errorMap: makeZodI18nMap(t_zod) }),
    defaultValues: {
      email: admin?.email ?? "",
      permission: {
        admin: Boolean(permissions & (1 << PermissionFlags.ADMIN)),
        read: Boolean(permissions & (1 << PermissionFlags.READ)),
        write: Boolean(permissions & (1 << PermissionFlags.WRITE)),
        read_hidden_pages: Boolean(permissions & (1 << PermissionFlags.READ_HIDDEN_PAGES)),
        write_pages: Boolean(permissions & (1 << PermissionFlags.WRITE_PAGES)),
        read_conf_app: Boolean(permissions & (1 << PermissionFlags.READ_CONF_APP)),
        accept_conf_app: Boolean(permissions & (1 << PermissionFlags.ACCEPT_CONF_APP)),
        create_conf_app: Boolean(permissions & (1 << PermissionFlags.CREATE_CONF_APP)),
        read_date_conf_app: Boolean(permissions & (1 << PermissionFlags.READ_DATE_CONF_APP)),
        edit_date_conf_app: Boolean(permissions & (1 << PermissionFlags.EDIT_DATE_CONF_APP)),
        read_content_conf_app: Boolean(permissions & (1 << PermissionFlags.READ_CONTENT_CONF_APP)),
        edit_content_conf_app: Boolean(permissions & (1 << PermissionFlags.EDIT_CONTENT_CONF_APP))
      }
    }
  });

  const isAdmin = useWatch({ control: form.control, name: "permission.admin" });
  const isReadHidden = useWatch({ control: form.control, name: "permission.read_hidden_pages" });
  const isReadConfApp = useWatch({ control: form.control, name: "permission.read_conf_app" });
  const isReadDateConfApp = useWatch({ control: form.control, name: "permission.read_date_conf_app" });
  const isReadContentConfApp = useWatch({ control: form.control, name: "permission.read_content_conf_app" });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid">
              <FormLabel>{t_admins('email')}</FormLabel>
              <FormControl>
                <Input placeholder={t_admins('email')} {...field} disabled={isEdit || field.disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permission.admin"
          render={({ field }) => (
            <FormItem className="flex gap-3">
              <FormControl>
                <Checkbox
                  {...field}
                  value={~~field.value}
                  onChange={undefined}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t_admins('permission.admin')}</FormLabel>
            </FormItem>
          )}
        />
        <Card className="grid gap-3 p-4 md:grid-cols-2 *:space-y-0">
          <FormField
            control={form.control}
            name="permission.read"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.read')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.write"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.write')}</FormLabel>
                {field.value}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.read_hidden_pages"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.read_hidden_pages')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.write_pages"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={
                      field.disabled ||
                      isAdmin ||
                      !isReadHidden
                    }
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.write_pages')}</FormLabel>
              </FormItem>
            )}
          />
          <Separator className="md:col-span-2" />
          <FormField
            control={form.control}
            name="permission.read_conf_app"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.read_conf_app')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.create_conf_app"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin || !isReadConfApp}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.create_conf_app')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.read_date_conf_app"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin || !isReadConfApp}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.read_date_conf_app')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.edit_date_conf_app"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin || !isReadConfApp || !isReadDateConfApp}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.edit_date_conf_app')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.read_content_conf_app"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin || !isReadConfApp}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.read_content_conf_app')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.edit_content_conf_app"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={field.disabled || isAdmin || !isReadConfApp || !isReadContentConfApp}
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.edit_content_conf_app')}</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permission.accept_conf_app"
            render={({ field }) => (
              <FormItem className="flex gap-3">
                <FormControl>
                  <Checkbox
                    {...field}
                    value={~~field.value}
                    disabled={
                      field.disabled ||
                      isAdmin ||
                      !isReadConfApp
                    }
                    onChange={undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t_admins('permission.accept_conf_app')}</FormLabel>
              </FormItem>
            )}
          />
        </Card>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">{t('cancel')}</Button>
          </DialogClose>
          <Button type="submit">{isEdit ? t('save') : t_admins('add')}</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

function hasPermission(permission: number, flag: PermissionFlags) {
  return Boolean(permission & (1 << flag));
}

function Permissions({
  admin,
  onEdit = () => {},
  onDelete = () => {}
}: Readonly<{
  admin: IAdminUser
  onEdit?: (admin: z.infer<typeof form_admin>) => Promise<void>|void
  onDelete?: (admin_id: UUID) => Promise<void>|void
}>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const locale = useCurrentLocale();
  const t = useI18n();

  const names = getAdminNames(admin, locale);

  const isAdmin = hasPermission(admin.permissions, PermissionFlags.ADMIN);

  let permissions = "";
  permissions += isAdmin ? t('confs.admins.permission.admin') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.READ) ? t('confs.admins.permission.read') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.WRITE) ? t('confs.admins.permission.write') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.READ_HIDDEN_PAGES) ? t('confs.admins.permission.read_hidden_pages') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.WRITE_PAGES) ? t('confs.admins.permission.write_pages') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.READ_CONF_APP) ? t('confs.admins.permission.read_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.ACCEPT_CONF_APP) ? t('confs.admins.permission.accept_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.CREATE_CONF_APP) ? t('confs.admins.permission.create_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.READ_DATE_CONF_APP) ? t('confs.admins.permission.read_date_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.EDIT_DATE_CONF_APP) ? t('confs.admins.permission.edit_date_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.READ_CONTENT_CONF_APP) ? t('confs.admins.permission.read_content_conf_app') + ", " : "";
  permissions += !isAdmin && hasPermission(admin.permissions, PermissionFlags.EDIT_CONTENT_CONF_APP) ? t('confs.admins.permission.edit_content_conf_app') + ", " : "";
  permissions = permissions.slice(0, -2);
  

  return (
    <Card key={admin.id} className="grid grid-cols-[1fr_auto] gap-2">
      <div className="*:pr-0">
        <CardHeader className="pr-2">
          <CardTitle>{names.firstName} {names.lastName}{names.middleName ? ` ${names.middleName}` : ''}</CardTitle>
          <CardDescription>{admin.email}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-[1fr_auto] gap-2">
          <div className="flex gap-2">
            <label className="font-bold">{t('confs.admins.permissions')}:</label>
            <span className="text-muted-foreground self-center">{permissions || "-"}</span>
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col gap-3 p-4 pl-0 justify-center">
        <Button variant="outline" size="icon" onClick={() => setDialogOpen(true)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => onDelete(admin.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogForm isEdit admin={admin} onSubmit={onEdit} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default function page() {
  const { permissions, isLoading } = useConfContext();
  const t = useI18n();
  const { slug } = useParams();
  const locale = useCurrentLocale();
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isLoading: isLoadingAdmins, admins, reload: reloadAdmins } = useConfAdminsHook(slug as string);

  if (user === "loading" || isLoading || isLoadingAdmins) return <LoadingComponent />

  if (!permissions.hasAnyRole("ADMIN") && !permissions.hasAnyPermission(PermissionFlags.ADMIN) || admins === "forbidden") 
    return <Page403 />

  if (admins === "error") return <Page500 />

  const submitAdmin = (admin: z.infer<typeof form_admin>) => {
    toast.promise(
      saveAdmin(slug as string, {
        email: admin.email,
        permissions: ~~admin.permission.admin << PermissionFlags.ADMIN |
          ~~admin.permission.read << PermissionFlags.READ |
          ~~admin.permission.write << PermissionFlags.WRITE |
          ~~admin.permission.read_hidden_pages << PermissionFlags.READ_HIDDEN_PAGES |
          ~~admin.permission.write_pages << PermissionFlags.WRITE_PAGES |
          ~~admin.permission.read_conf_app << PermissionFlags.READ_CONF_APP |
          ~~admin.permission.accept_conf_app << PermissionFlags.ACCEPT_CONF_APP |
          ~~admin.permission.create_conf_app << PermissionFlags.CREATE_CONF_APP |
          ~~admin.permission.read_date_conf_app << PermissionFlags.READ_DATE_CONF_APP |
          ~~admin.permission.edit_date_conf_app << PermissionFlags.EDIT_DATE_CONF_APP |
          ~~admin.permission.read_content_conf_app << PermissionFlags.READ_CONTENT_CONF_APP |
          ~~admin.permission.edit_content_conf_app << PermissionFlags.EDIT_CONTENT_CONF_APP
      }).then(v => {
        if (v.status !== "success") throw v.message[locale];
        setDialogOpen(false);
        reloadAdmins();
      }),
      {
        loading: t('loading.fetch'),
        success: t('confs.saved'),
        error: (error) => error
      }
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline"><Plus /> {t('confs.admins.add')}</Button>
          </DialogTrigger>
          <DialogContent className="max-h-dvh overflow-y-auto md:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t('confs.admins.add')}</DialogTitle>
              <DialogDescription>{t('confs.admins.add_description')}</DialogDescription>
            </DialogHeader>
            <DialogForm onSubmit={submitAdmin} />
          </DialogContent>
        </Dialog>
      </div>
      {admins.map(admin => <Permissions key={admin.id} admin={admin} onEdit={submitAdmin} />)}
    </div>
  )
}
