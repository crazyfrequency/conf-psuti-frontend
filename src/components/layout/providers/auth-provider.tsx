'use client'

import { getUserFromLocalStorage } from '@/services/auth-token.service'
import { getMe, logout } from '@/services/auth.service'
import { IUser } from '@/types/auth.types'
import React, { useCallback, useEffect, useMemo } from 'react'

export type TAuthContext = {
  reloadAuth: () => void
  logout: () => void
  user: IUser | "unauthorized" | "error" | "loading"
  lastErrors?: "logout"
}

const AuthProviderContext = React.createContext<TAuthContext|undefined>(undefined)

export function AuthProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [user, setUser] = React.useState<IUser|"unauthorized"|"error"|undefined>(undefined)

  const reloadAuth = useCallback(async () => {
    const user = getUserFromLocalStorage();

    if (user) return setUser(user);

    const response = await getMe()
    if (response.status === 'error' || response.status === 'not-found') {
      setTimeout(reloadAuth, 5000);
      if (user === "error") return
      return setUser("error");
    };
    if (response.status !== 'success') return setUser("unauthorized");
    setUser(response.data)
  }, [setUser])

  const logoutAuth = useCallback(async () => {
    const response = await logout();
    if (response.status !== 'success') return setUser(
      u => typeof u === "object" && u ? {
        ...u,
        lastErrors: "logout"
      } : "error"
    );
    localStorage.removeItem('user');
    setUser("unauthorized");
  }, [setUser])

  useEffect(() => {
    const getUser = async (event: StorageEvent) => {
      if (event.key === 'user') {
        const user = event.newValue ? JSON.parse(event.newValue) : "unauthorized";
        setUser(user)
      }
    }

    window.addEventListener('storage', getUser)
    return () => window.removeEventListener('storage', getUser)
  }, [setUser])

  useEffect(() => {
    reloadAuth()
  }, [])
  
  const context = useMemo(() => {
    return {
      reloadAuth: () => {
        setUser(undefined);
        reloadAuth()
      },
      logout: logoutAuth,
      user: user ?? "loading" as const
    }
  }, [user, reloadAuth])

  return (
    <AuthProviderContext.Provider value={context}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthProviderContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}