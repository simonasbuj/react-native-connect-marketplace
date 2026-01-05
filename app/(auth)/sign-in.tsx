import { signInAPI } from "@/api/auth.api"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { useAuth } from "@/context/AuthContext"
import { useMutation } from "@tanstack/react-query"
import { Link, Redirect, router } from 'expo-router'
import { useState } from "react"
import { View, Text } from 'react-native'

const SignIn = () => {
  const { isAuthenticated, signIn } = useAuth()
  
  if (isAuthenticated) return <Redirect href="/(tabs)" />
  

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signInMutation = useMutation({
    mutationFn: signInAPI,
    onSuccess: ({ access_token }) => {
      signIn(access_token)
    },
  })

  const { mutate, isPending, isError, error } = signInMutation

  return (
    <View className="gap-6 bg-white rounded-lg p-5 mt-5">
      <CustomInput 
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      <CustomInput 
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

      {isError && (
        <Text className="text-red-500 text-sm text-center">
          {error.message}
        </Text>
      )}

      <CustomButton 
        title = "Sign In"
        onPress={() => mutate({email, password})}
        isLoading={isPending}
      />

      <CustomButton 
        title = "Sign In with Github"
        onPress={() => console.log("signing in with github")}
        style="bg-black"
        isLoading={isPending}
      />

      <CustomButton 
        title = "Sign In with Google"
        onPress={() => console.log("signing in with google")}
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