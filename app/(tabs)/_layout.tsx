import { useAuth } from "@/context/AuthContext"
import { Redirect, Slot, SplashScreen } from 'expo-router'
import { useEffect } from "react"
import { Text } from "react-native"

export default function _Layout() {
  const { isAuthenticated, isInitialLoad } = useAuth()

  if (isInitialLoad) {
    return <Text>stuck on layout screen</Text>
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return <Slot />
}