import { useAuth } from "@/context/AuthContext"
import { Redirect, Slot } from 'expo-router'

export default function _Layout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />

  return <Slot />
}