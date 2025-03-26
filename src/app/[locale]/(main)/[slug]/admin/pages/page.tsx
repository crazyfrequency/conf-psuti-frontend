'use client'

import Page403 from "@/components/auth/403";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { default_pages } from "@/components/layout/conf/left-menu";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { ControlGroup, ControlGroupItem } from "@/components/ui/control-group";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dropzone, DropzoneGroup, DropzoneInput, DropzoneTitle, DropzoneUploadIcon, DropzoneZone } from "@/components/ui/dropzone";
import { FileList, FileListDescription, FileListHeader, FileListIcon, FileListInfo, FileListItem, FileListName, FileListSize } from "@/components/ui/file-list";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from "@/components/ui/input-base";
import { Skeleton } from "@/components/ui/skeleton";
import { Sortable, SortableItem, SortableItemTrigger, SortableList } from "@/components/ui/sortable";
import { SITE_DOMAIN_FRONT } from "@/constants/app.constants";
import { form_conference_pages } from "@/constants/conf.constants";
import { PermissionFlags } from "@/lib/user-permissions";
import { cn } from "@/lib/utils";
import { makeZodI18nMap } from "@/lib/zod-i18n";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { getStaticConfPageName as getStaticConfPageNames } from "@/locales/pages";
import { updateConfPages } from "@/services/confs.client.service";
import { TConfPageForm } from "@/types/conf.types";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowUp, Download, FileJson, GripVertical, Plus, Trash2, Upload } from "lucide-react";
import { HTMLAttributes, useMemo, useState } from "react";
import { Control, useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function Item({
  className,
  control,
  englishEnabled = false,
  slug,
  next,
  prev,
  remove,
  index,
  ...props
}: HTMLAttributes<HTMLDivElement> & Readonly<{
  control: Control<z.infer<ReturnType<typeof form_conference_pages>>> | undefined
  englishEnabled?: boolean
  slug: string
  next?: () => any
  prev?: () => any
  remove: () => any
  index: number
}>) {
  const disabled = !useWatch({ control, name: `pages.${index}.editable` });
  const t_lang = useScopedI18n('languages.context');
  const t = useScopedI18n('confs');

  return (
    <div
      className={cn(
        "group flex w-full cursor-default items-stretch overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-pressed:z-10 aria-pressed:shadow-lg",
        className
      )}
      {...props}
    >
      <SortableItemTrigger
        type="button"
        tabIndex={0}
        className="flex cursor-grab items-center justify-center bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none aria-pressed:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </SortableItemTrigger>
      <div className="flex flex-1 items-center justify-between gap-4 p-3">
        <div className="flex flex-col w-full gap-3">
          <FormField
            control={control}
            name={`pages.${index}.pageNameRu`}
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel>{t('pages.title', { lang: t_lang('ru') })}</FormLabel>
                <FormControl>
                  <Input {...field} disabled={disabled || field.disabled} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {englishEnabled && (
            <FormField
              control={control}
              name={`pages.${index}.pageNameEn`}
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>{t('pages.title', { lang: t_lang('en') })}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? undefined} disabled={disabled || field.disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={control}
            name={`pages.${index}.path`}
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel>{t('pages.path')}</FormLabel>
                  <ControlGroup>
                    <ControlGroupItem>
                      <InputBase disabled={disabled}>
                        <InputBaseAdornment className="break-all">
                          {SITE_DOMAIN_FRONT}/{slug}/
                        </InputBaseAdornment>
                      </InputBase>
                    </ControlGroupItem>
                    <ControlGroupItem>
                      <InputBase disabled={disabled} asChild>
                        <InputBaseControl>
                          <FormControl className="min-w-20">
                            <InputBaseInput {...field} disabled={disabled || field.disabled} />
                          </FormControl>
                        </InputBaseControl>
                      </InputBase>
                    </ControlGroupItem>
                  </ControlGroup>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button size="icon" variant="outline" type="button" onClick={prev} disabled={!prev}>
            <ArrowUp />
          </Button>
          <Button size="icon" variant="outline" type="button" onClick={next} disabled={!next}>
            <ArrowDown />
          </Button>
          <Button size="icon" variant="destructive" type="button" onClick={remove} disabled={disabled}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ImportButton({
  upload
}: Readonly<{
  upload: (file: File) => any
}>) {
  const [files, setFiles] = useState<File[]>([]);
  const t = useScopedI18n('confs');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
        >
          <Upload />
          {t('import.button')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('import.title')}</DialogTitle>
        </DialogHeader>
        <Dropzone
          accept={{ "application/json": [".json"] }}
          onDropAccepted={setFiles}
          preventDropOnDocument
          maxFiles={1}
        >
          <div className="grid gap-4 py-4">
            <DropzoneZone>
              <DropzoneInput />
              <DropzoneGroup className="gap-4">
                <DropzoneUploadIcon />
                <DropzoneGroup>
                  <DropzoneTitle>{t('import.drop')}</DropzoneTitle>
                </DropzoneGroup>
              </DropzoneGroup>
            </DropzoneZone>
            <FileList>
              {files.length > 0 && (
                <FileListItem>
                  <FileListHeader>
                    <FileListIcon><FileJson /></FileListIcon>
                    <FileListInfo>
                      <FileListName>{files[0].name}</FileListName>
                      <FileListDescription>
                        <FileListSize>{files[0].size}</FileListSize>
                      </FileListDescription>
                    </FileListInfo>
                  </FileListHeader>
                </FileListItem>
              )}
            </FileList>
          </div>
        </Dropzone>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">{t('cancel')}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => upload(files[0])} type="submit">{t('import.button')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function page() {
  const { data, permissions, isLoading, reload } = useConfContext();
  const t_loading = useScopedI18n('loading');
  const t_zod = useScopedI18n('zod');
  const locale = useCurrentLocale();
  const t = useScopedI18n('confs');
  const { user } = useAuth();

  const pages = useMemo(() => {
    if (typeof data !== "object") return undefined;
    return data?.pages?.map?.((v) => {
      const default_page = default_pages.includes(v.path as any);

      if (default_page) {
        const { ru, en } = getStaticConfPageNames(v.path as any);
        return {
          ...v,
          old_id: v.id,
          pageNameRu: ru,
          pageNameEn: en,
          editable: false
        }
      }

      return {
        ...v,
        old_id: v.id,
        pageNameEn: v.pageNameEn ?? "",
        editable: true
      }
    })
    // return data?.pages?.map?.((v) => ({ ...v, pageNameEn: v.pageNameEn ?? "", editable: !default_pages.includes(v.path as any) }))
  }, [data]);

  const form_schema = form_conference_pages(t_zod, typeof data === "object" ? data?.isEnglishEnabled ?? false : false);

  const form = useForm<z.infer<typeof form_schema>>({
    resolver: zodResolver(form_schema, {errorMap: makeZodI18nMap(t_zod)}),
    defaultValues: {
      pages
    }
  })

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "pages",
    keyName: "id"
  })

  if (user === "loading" || isLoading) return (
    <div className="relative text-center space-y-2">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
  )

  if (!permissions.hasAnyRole("ADMIN") && !permissions.hasAnyPermission(PermissionFlags.ADMIN, PermissionFlags.WRITE_PAGES))
    return <Page403 />
  
  const onSubmit = (form_data: z.infer<typeof form_schema>) => {
    const pages: TConfPageForm[] = form_data.pages.map((v, i) => ({
      pageNameRu: v.pageNameRu,
      pageNameEn: v.pageNameEn,
      pageIndex: i,
      path: v.path,
      id: v.old_id
    }));

    toast.promise(updateConfPages(data?.slug ?? "", pages).then(v => {
      if (v.status !== "success") throw v.message[locale];
      reload();
    }), {
      loading: t_loading('fetch'),
      success: t('saved'),
      error: (error) => error
    })
  }

  const exportJson = () => {
    const formData = {
      conf_id: data.id,
      conf_slug: data.slug,
      ...form.watch()
    };
    const json = JSON.stringify(formData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `pages_${data?.slug ?? ''}_${new Date().toISOString()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  const importJson = (file?: File) => {
    if (!file) return toast.error(t('import.select'));
    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      if (!form_schema.safeParse(data).success)
        return toast.error(t('import.invalid'));

      form.reset(data);
    };

    reader.onerror = () => {
      toast.error(t('import.invalid'));
    };

    reader.readAsText(file);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pages"
          render={({ fieldState }) => (
            <FormItem className="grid">
              <Sortable
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                onDragEnd={(event) => {
                  const { active, over } = event

                  if (over && active.id !== over.id) {
                    const oldIndex = fields.findIndex(
                      (field) => field.id === active.id
                    )
                    const newIndex = fields.findIndex(
                      (field) => field.id === over.id
                    )

                    move(oldIndex, newIndex)
                  }
                }}
              >
                <SortableList
                  items={fields.map(f => f.id)}
                  className="flex flex-col gap-2"
                >
                  {fields.map((field, index, all) => (
                    <SortableItem key={field.id} id={field.id} asChild>
                      <Item
                        index={index}
                        control={form.control}
                        englishEnabled={data?.isEnglishEnabled}
                        slug={data?.slug}
                        next={index < all.length - 1 ? () => move(index, index + 1) : undefined}
                        prev={index > 0 ? () => move(index, index - 1) : undefined}
                        remove={() => remove(index)}
                      />
                    </SortableItem>
                  ))}
                </SortableList>
              </Sortable>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex max-md:flex-col gap-2 mt-4 justify-end">
          <div className="flex gap-2 justify-end">
            <ImportButton upload={importJson} />
            <Button
              onClick={form.handleSubmit(exportJson)}
              variant="outline"
              type="button"
            >
              <Download />
              {t('export')}
            </Button>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => append({ id: 0, pageNameRu: "", pageNameEn: "", path: "", editable: true, old_id: null })}
              variant="outline"
              type="button"
            >
              <Plus />
              {t('add_page')}
            </Button>
            <Button className="cursor-pointer">
              {t('save')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
