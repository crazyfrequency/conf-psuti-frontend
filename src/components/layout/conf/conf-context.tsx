'use client'

import { TResponseResult } from '@/api/error';
import { Separator } from '@/components/ui/separator';
import { AUTH_PAGES } from '@/constants/pages.constants';
import { cn } from '@/lib/utils';
import { useCurrentLocale } from '@/locales/client';
import { getConf } from '@/services/confs.client.service';
import { TConf } from '@/types/conf.types';
import { useRouter } from 'next-nprogress-bar';
import { notFound, usePathname } from 'next/navigation';
import React, { createContext, useEffect } from 'react';
import LeftMenu from './left-menu';
import Path from './path';

export type TConfContext = {
  isLoading: false;
  data: TConf;
  reload: () => Promise<void>|void;
  clientLoading: boolean;
} | {
  isLoading: true;
  data: null|"forbidden";
  reload: () => Promise<void>|void;
  clientLoading?: boolean;
};

const DataContext = createContext<TConfContext>({
  isLoading: true,
  data: null,
  reload: () => {}
});

export const useConfContext = () => React.useContext(DataContext);

export default function ConfContext({
  slug,
  response,
  children,
}: Readonly<{
  slug: string,
  response: TResponseResult<TConf>,
  children: React.ReactNode
}>) {
  const locale = useCurrentLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [context, setContext] = React.useState<TConfContext>(() => {
    if (response.status === 'success')
      return { isLoading: false, data: response.data, reload: () => {}, clientLoading: false };
    return { isLoading: true, data: null, reload: () => {}, clientLoading: true };
  });

  const fetchConf = async () => {
    const response = await getConf(slug);
    if (response.status === 'unauthorized')
      return router.replace(AUTH_PAGES.LOGIN(pathname));
    if (response.status !== 'success')
      return setContext({ isLoading: true, data: "forbidden", reload: fetchConf, clientLoading: false });
    setContext({ isLoading: false, data: response.data, reload: fetchConf, clientLoading: false });
  };

  useEffect(()=>{
    console.log(response);
    if(response.status !== 'success')
      fetchConf();
  }, [response, slug])

  if (context.data === "forbidden")
    return notFound();

  const title = "123"

  const status = "123"

  return (
    <DataContext.Provider value={{
      ...context,
      reload: fetchConf
    }}>
      <Path />
      <div className="grid relative grid-rows-1 lg:grid-cols-[auto_auto_1fr] gap-2 w-full">
        <LeftMenu
          className={cn(
            "max-lg:overflow-y-auto max-lg:max-h-72 max-lg:p-4",
            "max-lg:border max-lg:rounded-lg max-lg:bg-card",
            "max-lg:w-full max-lg:shadow-sm"
          )}
        />
        <Separator className="max-lg:hidden" orientation="vertical" />
        <main>
          <h1 className="text-center text-2xl">{title}</h1>
          <h2 className="text-center text-lg text-muted-foreground">{status}</h2>
          <Separator className="my-4" />
          {children}
        </main>
      </div>
    </DataContext.Provider>
  )
}
