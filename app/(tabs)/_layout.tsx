import TabBarIcon from "@/components/TabBarIcon"
import { images } from "@/constants"
import { useAuth } from "@/context/AuthContext"
import { Redirect, Tabs } from 'expo-router'

export default function _Layout() {    
  const { isAuthenticated, isInitialLoad } = useAuth()

  if (isInitialLoad) {
    return null
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 35,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused} ) => <TabBarIcon focused={focused} title="Home" icon={images.home}/>
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          tabBarIcon: ({ focused} ) => <TabBarIcon focused={focused} title="Browse" icon={images.search}/>
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          tabBarIcon: ({ focused} ) => <TabBarIcon focused={focused} title="Sell" icon={images.bag}/>
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused} ) => <TabBarIcon focused={focused} title="Profile" icon={images.user}/>
        }}
      />
    </Tabs>
  )
}