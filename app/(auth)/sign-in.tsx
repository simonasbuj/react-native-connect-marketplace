import { signInAPI, SignInPayload } from "@/api/auth.api"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { useAuth } from "@/context/AuthContext"
import { useMutation } from "@tanstack/react-query"
import { Link, router } from 'expo-router'
import { useState } from "react"
import { View, Text, Platform } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

const SignIn = () => {
  const { signIn } = useAuth()

  const [form, setForm] = useState<SignInPayload>({
    email: "",
    password: ""
  })

  const updateField = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const signInMutation = useMutation({
    mutationFn: signInAPI,
    onSuccess: ({ access_token }) => {
      signIn(access_token)
    },
  })

  const handleOauth = async (provider: string) => {
    await WebBrowser.openBrowserAsync(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/auth/${provider}/init`)
    if (Platform.OS === 'ios') {
      router.push('/(auth)/oauth-exchange')
    }
  }

  const { mutate, isPending, isError, error } = signInMutation

  return (
    <View className="gap-6 bg-white rounded-lg p-5 mt-5">
      <CustomInput 
          label="Email"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={text => updateField("email", text)}
          keyboardType="email-address"
        />
      <CustomInput 
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChangeText={text => updateField("password", text)}
          secureTextEntry={true}
        />

      {isError && (
        <Text className="text-red-500 text-sm text-center">
          {error.message}
        </Text>
      )}

      <CustomButton 
        title = "Sign In"
        onPress={() => mutate(form)}
        isLoading={isPending}
      />

      <CustomButton 
        title = "Sign In with Github"
        onPress={() => handleOauth("github")}
        style="bg-black"
        isLoading={isPending}
      />

      <CustomButton 
        title = "Sign In with Google"
        onPress={() => handleOauth("google")}
        style="bg-red-500"
        isLoading={isPending}
      />

      <View>
        <Text className="base-regular text-gray-100 text-center">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary text-center">
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default SignIn