'use server'

import Years from "@/components/layout/years";
import { Separator } from "@/components/ui/separator";
import { getYearsList } from "@/services/confs.server.service";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let response = await getYearsList();
  return (
    <div className="w-full">
      <Years response={response} />
      <Separator className="mt-2 mb-4" />
      {children}
    </div>
  );
}
