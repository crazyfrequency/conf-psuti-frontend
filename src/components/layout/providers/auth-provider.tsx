'use client'

import { getUserFromLocalStorage } from '@/services/auth-token.service'
import { getMe, logout } from '@/services/auth.service'
import { IUser } from '@/types/auth.types'
import React, { useCallback, useEffect, useMemo } from 'react'

type TAuthContext = {
  reloadAuth: () => void
  logout: () => void
  user: IUser | "unauthorized" | "loading"
}

const AuthProviderContext = React.createContext<TAuthContext|undefined>(undefined)

export function AuthProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [user, setUser] = React.useState<IUser|"unauthorized"|undefined>(undefined)

  const reloadAuth = useCallback(async () => {
    const user = getUserFromLocalStorage();

    if (user) return setUser(user);

    const response = await getMe()
    if (response.status !== 'success') return setUser("unauthorized");
    setUser(response.data)
  }, [setUser])

  const logoutAuth = useCallback(async () => {
    const response = await logout();
    if (response.status !== 'success') return
    localStorage.removeItem('user');
    setUser("unauthorized");
  }, [setUser])

  useEffect(() => {
    const getUser = async (event: StorageEvent) => {
      console.log(event)
      if (event.key === 'user') {
        const user = event.newValue ? JSON.parse(event.newValue) : null;
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
      reloadAuth,
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