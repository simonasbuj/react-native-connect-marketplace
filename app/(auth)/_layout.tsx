import { images } from "@/constants";
import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from 'expo-router'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function _Layout() {  
  const { isAuthenticated } = useAuth()
    
  if (isAuthenticated) return <Redirect href="/(tabs)" />

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
         <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
          <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25}}>
            <ImageBackground 
              source={images.loginGraphic} 
              className="size-full rounded-3xl overflow-hidden"
              resizeMode="stretch"
            />
            <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10"/>
          </View>
          <Slot />
        </ScrollView>
      </KeyboardAvoidingView>
  )
}