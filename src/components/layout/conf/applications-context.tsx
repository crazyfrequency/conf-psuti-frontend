'use client'

import useConfApplicationsHook from "@/hooks/applications.hook";
import { IApplication } from "@/types/application.types";
import { createContext, useContext } from "react";

export type TConfApplicationsContext = {
  isLoading: false;
  data: IApplication[]|null;
  pageActive: boolean;
  reload: () => Promise<void>|void;
} | {
  isLoading: true;
  data: null|"forbidden";
  pageActive: boolean;
  reload: () => Promise<void>|void;
};

const DataContext = createContext<TConfApplicationsContext>({
  isLoading: true,
  data: null,
  pageActive: false,
  reload: () => {},
});

export const useConfApplicationsContext = () => useContext(DataContext);

export function ConfApplicationsContext({
  slug,
  children
}: Readonly<{
  slug: string,
  children: React.ReactNode,
}>) {
  const context = useConfApplicationsHook(slug);

  return (
    <DataContext.Provider value={context as TConfApplicationsContext}>
      {children}
    </DataContext.Provider>
  )
}

export default ConfApplicationsContext