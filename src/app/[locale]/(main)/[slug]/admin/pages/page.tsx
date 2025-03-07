'use client'

import Page403 from "@/components/auth/403";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { admin_pages } from "@/components/layout/conf/path";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { ControlGroup, ControlGroupItem } from "@/components/ui/control-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputBase, InputBaseAdornment, InputBaseControl, InputBaseInput } from "@/components/ui/input-base";
import { Skeleton } from "@/components/ui/skeleton";
import { Sortable, SortableItem, SortableItemTrigger, SortableList } from "@/components/ui/sortable";
import { SITE_DOMAIN_FRONT } from "@/constants/app.constants";
import { form_conference_pages } from "@/constants/conf.constants";
import { PermissionFlags } from "@/lib/user-permissions";
import { cn } from "@/lib/utils";
import { useScopedI18n } from "@/locales/client";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from "lucide-react";
import { HTMLAttributes, useMemo } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
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
  next: () => any
  prev: () => any
  remove: () => any
  index: number
}>) {
  return (
    <div
      className={cn(
        "group flex w-full cursor-default items-stretch overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-pressed:z-10 aria-pressed:shadow-lg",
        className
      )}
      {...props}
    >
      <SortableItemTrigger
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
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <FormLabel>English name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? undefined} />
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
                <FormLabel htmlFor={`pages.${index}.path`}>URL</FormLabel>
                <FormControl> 
                  <ControlGroup>
                    <ControlGroupItem>
                      <InputBase>
                        <InputBaseAdornment>
                          {SITE_DOMAIN_FRONT}/{slug}/
                        </InputBaseAdornment>
                      </InputBase>
                    </ControlGroupItem>
                    <ControlGroupItem>
                      <InputBase asChild>
                        <InputBaseControl>
                          <FormControl>
                            <InputBaseInput id={`pages.${index}.path`} {...field} />
                          </FormControl>
                        </InputBaseControl>
                      </InputBase>
                    </ControlGroupItem>
                  </ControlGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button size="icon" variant="outline" type="button" onClick={prev}>
            <ArrowUp />
          </Button>
          <Button size="icon" variant="outline" type="button" onClick={next}>
            <ArrowDown />
          </Button>
          <Button size="icon" variant="destructive" type="button" onClick={remove}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function page() {
  const { data, permissions, isLoading, reload } = useConfContext();
  const t = useScopedI18n('zod');
  const { user } = useAuth();

  const pages = useMemo(() => {
    // TODO remove i index
    if (typeof data !== "object") return undefined;
    return data?.pages?.map?.((v, i) => ({ ...v, pageNameEn: v.pageNameEn ?? "", editable: admin_pages.includes(v.path as any) }))
  }, [data]);

  const form_schema = form_conference_pages(t, typeof data === "object" ? data?.isEnglishEnabled ?? false : false);

  const form = useForm<z.infer<typeof form_schema>>({
    resolver: zodResolver(form_schema),
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
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-16" />
      ))}
    </div>
  )

  if (!permissions.hasAnyRole("ADMIN") && !permissions.hasAnyPermission(PermissionFlags.WRITE_PAGES))
    return <Page403 />
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log, console.error)}>
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
                        next={all[index + 1]?.id ? () => move(index, index + 1) : () => {}}
                        prev={all[index - 1]?.id ? () => move(index, index - 1) : () => {}}
                        remove={() => remove(index)}
                      />
                    </SortableItem>
                  ))}
                </SortableList>
              </Sortable>
              {fieldState.error?.message && <FormMessage />}
            </FormItem>
          )}
        />
        <div className="flex gap-2 mt-4 justify-end">
          <Button
            onClick={() => append({ id: 0, pageNameRu: "", pageNameEn: "", path: "", editable: true })}
            variant="outline"
            type="button"
          >
            <Plus />
            Добавить страницу
          </Button>
          <Button className="cursor-pointer">
            Сохранить
          </Button>
        </div>
      </form>
    </Form>
  )
}
