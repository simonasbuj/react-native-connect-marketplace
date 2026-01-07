import { createContext, useContext, useEffect, useMemo, useState } from "react"
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

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

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
      try {
        signIn(data.access_token)
      } finally {
        setIsInitialLoad(false)
      }
    },
    onError: () => {
      console.log("running on eror in refresh mutation")
      try {
        console.log("running signout on eror in refresh mutation")
        signOut()
      } finally {
        console.log("running setIsInitialLoad on eror in refresh mutation")
        setIsInitialLoad(false)
      }
    }
  })

  const signOut = () => {
    signOutMutate()
    setAccessToken(null)
    setUser(null)
  }

  useEffect(() => {
    refreshTokenMutate()
  }, [])

  const value = useMemo(
    () => ({
      accessToken,
      isAuthenticated: !!accessToken,
      user,
      signIn,
      signOut,
      isInitialLoad,
    }),
    [accessToken]
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
