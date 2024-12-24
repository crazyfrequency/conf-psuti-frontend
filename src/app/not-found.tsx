import { Separator } from "@/components/ui/separator";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { setStaticParamsLocale } from "next-international/server";

export const metadata: Metadata = {
  title: "404",
  description: "Страница не найдена",
  ...NO_INDEX_PAGE
};

export default function Error404() {
  setStaticParamsLocale('ru');
  return (
    <div className="bg-background gap-3 h-dvh flex flex-col justify-center items-center font-sans">
      <div className="flex justify-center items-center gap-6">
        <h1 className="text-2xl my-2">404</h1>
        <Separator orientation="vertical" />
        <h2 className="text-sm">This page could not be found.</h2>
      </div>
      <p>Запрошенная страница не может быть найдена, но возможно снова станет доступна в будущем.</p>
      <footer className="fixed bottom-2 justify-center items-center">
        <p>
          Служба поддержки <a className="underline" href="mailto:helpdesk@psuti.ru">helpdesk@psuti.ru</a>
        </p>
      </footer>
    </div>
  )
}