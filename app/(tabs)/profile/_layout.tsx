import { Stack } from "expo-router"

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true, 
      animation:"slide_from_right",
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="my-listings" options={{ title: "Listings" }}/>
      <Stack.Screen name="my-orders" options={{ title: "Orders" }} />
      <Stack.Screen name="settings"/>
    </Stack>
  )
}
