'use client'

import Page403 from "@/components/auth/403";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dropzone, DropzoneGroup, DropzoneInput, DropzoneTitle, DropzoneUploadIcon, DropzoneZone } from "@/components/ui/dropzone";
import { FileList, FileListDescription, FileListHeader, FileListIcon, FileListInfo, FileListItem, FileListName, FileListSize } from "@/components/ui/file-list";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { form_conference_sections, form_conference_sections_import } from "@/constants/conf.constants";
import { PermissionFlags } from "@/lib/user-permissions";
import { makeZodI18nMap } from "@/lib/zod-i18n";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { updateConfSections } from "@/services/confs.client.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FileJson, Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
  const t_lang = useScopedI18n('languages.context');
  const t_loading = useScopedI18n('loading');
  const t_zod = useScopedI18n('zod');
  const locale = useCurrentLocale();
  const t = useScopedI18n("confs");

  const sections = useMemo(() => {
    if (typeof data !== "object") return undefined;
    return data?.conferenceSections;
  }, [data]);

  const form_schema = form_conference_sections(typeof data === "object" ? data?.isEnglishEnabled ?? false : false);

  const form = useForm<z.infer<typeof form_schema>>({
    resolver: zodResolver(form_schema, {errorMap: makeZodI18nMap(t_zod)}),
    defaultValues: {
      sections: sections
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
    keyName: "key"
  });

  useEffect(() => {
    form.reset({ sections });
  }, [sections])

  if (isLoading) return (
    <div className="relative text-center space-y-2">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-32" />
      ))}
    </div>
  )

  if (!permissions.hasAnyRole("ADMIN") && !permissions.hasAnyPermission(PermissionFlags.ADMIN, PermissionFlags.WRITE))
    return <Page403 />

  const save = (sections: z.infer<typeof form_schema>) => {
    toast.promise(
      updateConfSections(data.slug, sections.sections.map(s => ({
        id: s.id ?? undefined,
        sectionNameRu: s.sectionNameRu,
        sectionNameEn: s.sectionNameEn ?? undefined,
        placeRu: s.placeRu ?? undefined,
        placeEn: s.placeEn ?? undefined
      }))).then(res => {
        if (res.status !== "success") throw res.message[locale];
        reload();
      }),
      {
        loading: t_loading('fetch'),
        success: t('saved'),
        error: (error) => error
      }
    )
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
    link.download = `sections_${data?.slug ?? ''}_${new Date().toISOString()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  const importJson = (file?: File) => {
    if (!file) return toast.error(t('import.select'));
    const reader = new FileReader();
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      if (!form_conference_sections_import.safeParse(data).success)
        return toast.error(t('import.invalid'));

      let sections = data.sections.filter((s: any) => !s.isDefault).map((s: any) => ({
        id: s.id ?? undefined,
        sectionNameRu: s.sectionNameRu,
        sectionNameEn: s.sectionNameEn ?? undefined,
        placeRu: s.placeRu ?? undefined,
        placeEn: s.placeEn ?? undefined,
        isDefault: false
      }));

      form.reset({ sections: data.sections.filter((s: any) => s.isDefault).concat(sections) });
    };

    reader.onerror = () => {
      toast.error(t('import.invalid'));
    };

    reader.readAsText(file);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(save)}>
        {fields.map((section, index) => (
          <Card key={section.key} className="p-4 grid grid-cols-[1fr_auto] gap-3">
            <div className="grid xl:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name={`sections.${index}.sectionNameRu`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("sections.sectionName")} {t_lang('ru')}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={field.disabled || section.isDefault} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`sections.${index}.placeRu`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("sections.place")} {t_lang('ru')}</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} disabled={field.disabled || section.isDefault} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {data.isEnglishEnabled && (
                <>
                  <FormField
                    control={form.control}
                    name={`sections.${index}.sectionNameEn`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("sections.sectionName")} {t_lang('en')}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} disabled={field.disabled || section.isDefault} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`sections.${index}.placeEn`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("sections.place")} {t_lang('en')}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} disabled={field.disabled || section.isDefault} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                disabled={section.isDefault}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
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
              onClick={() => append({
                id: null,
                sectionNameRu: "",
                placeRu: "",
                sectionNameEn: "",
                placeEn: "",
                isDefault: false
              })}
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
