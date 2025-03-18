import { Separator } from "@/components/ui/separator";
import { HELP_DESK_EMAIL } from "@/constants/app.constants";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Страница не найдена",
  ...NO_INDEX_PAGE
};

export default function Error404() {
  return (
    <div className="bg-background gap-3 h-dvh flex flex-col justify-center items-center font-sans text-center">
      <div className="flex justify-center items-center gap-6">
        <h1 className="text-2xl my-2">404</h1>
        <Separator orientation="vertical" />
        <h2 className="text-sm">This page could not be found.</h2>
      </div>
      <p>Запрошенная страница не может быть найдена, но возможно снова станет доступна в будущем.</p>
      <footer className="fixed bottom-2 justify-center items-center">
        <p>
          Служба поддержки <a className="underline text-primary" href={`mailto:${HELP_DESK_EMAIL}`}>helpdesk@psuti.ru</a>
        </p>
      </footer>
    </div>
  )
}