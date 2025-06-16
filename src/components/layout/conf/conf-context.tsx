'use client'

import { TResponseResult } from '@/api/error';
import Page403 from '@/components/auth/403';
import { Separator } from '@/components/ui/separator';
import useConfHook from '@/hooks/conf-context-hook';
import { UserConferencePermissions } from '@/lib/user-permissions';
import { cn } from '@/lib/utils';
import { TConf } from '@/types/conf.types';
import React, { createContext } from 'react';
import ConfApplicationsContext from './applications-context';
import LeftMenu from './left-menu';
import Path from './path';
import TopMenu from './top-menu';

export type TConfContext = {
  isLoading: false;
  data: TConf;
  permissions: UserConferencePermissions;
  reload: () => Promise<void>|void;
  clientLoading: boolean;
} | {
  isLoading: true;
  data: null|"forbidden";
  permissions: UserConferencePermissions;
  reload: () => Promise<void>|void;
  clientLoading?: boolean;
};

const DataContext = createContext<TConfContext>({
  isLoading: true,
  data: null,
  permissions: new UserConferencePermissions("loading", ""),
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
    return <Page403 />;

  return (
    <DataContext.Provider value={{
      ...context,
      reload: fetchConf
    }}>
      <ConfApplicationsContext slug={slug}>
        <Path />
        <div className="grid relative grid-rows-1 grid-cols-1 lg:grid-cols-[auto_auto_1fr] gap-2 w-full">
          <LeftMenu
            className={cn(
              "max-lg:overflow-y-auto max-lg:max-h-72 max-lg:p-4",
              "max-lg:border max-lg:rounded-lg max-lg:bg-card",
              "max-lg:w-full max-lg:shadow-xs"
            )}
          />
          <Separator className="max-lg:hidden" orientation="vertical" />
          <main className='min-w-0 w-full max-lg:pt-3'>
            <TopMenu />
            <Separator className="my-4" />
            {children}
          </main>
        </div>
      </ConfApplicationsContext>
    </DataContext.Provider>
  )
}
