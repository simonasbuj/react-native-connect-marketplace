import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useMutation } from "@tanstack/react-query"
import { refreshTokenAPI, signOutAPI } from "@/api/auth.api"
import { SplashScreen } from "expo-router"

export interface User {
  exp: number
  role: "admin" | "customer"
  sub: string
}

interface AuthContextValue {
  accessToken: string | null
  isAuthenticated: boolean
  user: User | null
  signIn: (token: string) => void
  signOut: () => void
  isInitialLoad: boolean
}

const REFRESH_GRACE_PERIOD_SECONDS = 30

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const didInitialRefreshRef = useRef(false)

  const signIn = (token: string) => {
    setAccessToken(token)
    try {
      const decoded = jwtDecode<User>(token)
      setUser(decoded)
    } catch (e) {
      console.error("Failed to decode JWT", e)
      setUser(null)
    }
  }

  const { mutate: signOutMutate } = useMutation({
    mutationFn: signOutAPI
  })
  
  const { mutate: refreshTokenMutate } = useMutation({
    mutationFn: refreshTokenAPI,
    onSuccess: (data: { access_token: string }) => {
      signIn(data.access_token)
      setIsInitialLoad(false)
    },
    onError: () => {
      setIsInitialLoad(false)
      signOut()
    }
  })

  const signOut = () => {
    signOutMutate()
    setAccessToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (!isInitialLoad) {
      SplashScreen.hideAsync().catch(() => {})
    }
  }, [isInitialLoad])

  useEffect(() => {
    refreshTokenMutate()
  }, [])

  useEffect(() => {
    if (!user?.exp) return

    const now = Date.now() / 1000
    const refreshIn = (user.exp - now - REFRESH_GRACE_PERIOD_SECONDS) * 1000

    if (refreshIn <= 0) {
      refreshTokenMutate()
      return
    }

    const timeout = setTimeout(() => {
      refreshTokenMutate()
    }, refreshIn)

    return () => clearTimeout(timeout)
  }, [user?.exp])

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated: !!accessToken,
      user,
      signIn,
      signOut,
      isInitialLoad,
    }),
    [accessToken, isInitialLoad]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
