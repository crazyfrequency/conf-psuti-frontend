'use client'

import { TResponseResult } from '@/api/error';
import { Separator } from '@/components/ui/separator';
import useConfHook from '@/hooks/conf-context-hook';
import { cn } from '@/lib/utils';
import { TConf } from '@/types/conf.types';
import { notFound } from 'next/navigation';
import React, { createContext } from 'react';
import LeftMenu from './left-menu';
import Path from './path';
import TopMenu from './top-menu';

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
  const { context, fetchConf } = useConfHook({ slug, response });

  if (context.data === "forbidden")
    return notFound();

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
          <TopMenu />
          <Separator className="my-4" />
          {children}
        </main>
      </div>
    </DataContext.Provider>
  )
}
