'use client'

import Page403 from "@/components/auth/403";
import Page500 from "@/components/auth/500";
import { useConfContext } from "@/components/layout/conf/conf-context";
import { useAuth } from "@/components/layout/providers/auth-provider";
import LoadingComponent from "@/components/loading-component";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CONF_PAGES } from "@/constants/pages.constants";
import { PermissionFlags } from "@/lib/user-permissions";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { getConfPage, updateConfPage } from "@/services/confs.client.service";
import { useRouter } from "@bprogress/next";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

const capitalize = (str: string) => `${str[0]?.toUpperCase()}${str.slice(1)}`

export default function EditClient({
  autoFocus = true
}: Readonly<{
  autoFocus?: boolean
}>) {
  const { data, permissions, isLoading, reload } = useConfContext();
  const [text, setText] = useState<[string, string]|"error"|"forbidden"|null>(null);
  const [stateRu, setStateRu] = useState<string|null>(null);
  const [stateEn, setStateEn] = useState<string|null>(null);
  const [pageEnabled, setPageEnabled] = useState<boolean>(false);
  const t_loading = useScopedI18n("loading");
  const t_error = useScopedI18n("errors");
  const { slug, sub_path } = useParams();
  const locale = useCurrentLocale();
  const t = useScopedI18n("confs");
  const t_lang = useScopedI18n("languages.context")
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user === "unauthorized")
      router.push(CONF_PAGES.CONF_PAGE(slug as string, sub_path as string));
  }, [user])

  useEffect(() => {
    getConfPage(slug as string, sub_path as string).then(t => {
      if (t.status !== 'success') {
        if (t.status === 'forbidden') setText("forbidden");
        else setText("error");

        return toast.error(t_error('fetch'), {
          description: t.message[locale],
          action: {
            label: t_error('actions.reload'),
            onClick: () => {
              window.location.reload();
            }
          }
        });
      }

      setText([t.data.htmlContentRu ?? "", t.data.htmlContentEn ?? ""]);
      setStateRu(t.data.htmlContentRu ?? "")
      setStateEn(t.data.htmlContentEn ?? "")
      setPageEnabled(t.data.isEnabled);
    });
  }, [user, slug, sub_path])

  if (text === "forbidden") return <Page403 />;
  if (text === "error") return <Page500 />;

  if (user === "loading" || !text || isLoading) return <LoadingComponent />;

  if (!permissions.hasAnyRole("ADMIN") && !permissions.hasAnyPermission(PermissionFlags.ADMIN, PermissionFlags.WRITE_PAGES))
    return <Page403 />;

  const parser = new DOMParser();

  function send() {
    toast.promise(
      updateConfPage(slug as string, sub_path as string, {
        htmlContentRu: stateRu ?? "",
        htmlContentEn: stateEn ?? "",
        isEnabled: pageEnabled
      }).then(response => {
        if (response.status === 'success') return reload();
        throw response.message[locale];
      }),
      {
        success: t('saved'),
        error: (error) => error,
        loading: t_loading('fetch')
      }
    )
  }

  return (
    <div>
      <Label htmlFor="page_enabled" className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <p className="text-sm leading-none font-medium">
          {t("page_enabled.title")}
        </p>
        <Switch
          id="page_enabled"
          checked={pageEnabled}
          onCheckedChange={setPageEnabled}
        />
      </Label>
      <div className="mt-6">
        <Label className="text-lg ml-4">{capitalize(t_lang("ru"))}:</Label>
        <Editor
          className="mt-2"
          editorState={text[0] ? parser.parseFromString(DOMPurify.sanitize(text[0]), "text/html") : null}
          onChange={setStateRu}
          autoFocus={autoFocus}
        />
      </div>
      {data.isEnglishEnabled && (
        <div className="mt-6">
          <Label className="text-lg ml-4">{capitalize(t_lang("en"))}:</Label>
          <Editor
            className="mt-2"
            editorState={text[1] ? parser.parseFromString(DOMPurify.sanitize(text[1]), "text/html") : null}
            onChange={setStateEn}
          />
        </div>
      )}
      <div className="flex gap-2 mt-4 justify-end">
        <Button variant="secondary" asChild>
          <Link href={CONF_PAGES.CONF_PAGE(slug as string, sub_path as string)}>
            {t("cancel")}
          </Link>
        </Button>
        <Button
          className="cursor-pointer"
          onClick={send}
        >
          {t("save")}
        </Button>
      </div>
    </div>
  )
}
