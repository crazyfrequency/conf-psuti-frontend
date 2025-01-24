'use client'

import { getMe } from '@/services/auth.service'
import { IUser } from '@/types/auth.types'
import React, { useCallback, useEffect, useMemo } from 'react'

type TAuthContext = {
  reloadAuth: () => void
  user: IUser | "unauthorized"
}

const AuthProviderContext = React.createContext<TAuthContext|undefined>(undefined)

export function AuthProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [user, setUser] = React.useState<IUser|undefined>(undefined)

  const reloadAuth = useCallback(async () => {
    const response = await getMe()
    if (response.status !== 'success') return
    setUser(response.data)
  }, [user])

  useEffect(() => {
    reloadAuth()
  }, [])
  
  const context = useMemo(() => {
    return {
      reloadAuth,
      user: user ?? "unauthorized" as "unauthorized"
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