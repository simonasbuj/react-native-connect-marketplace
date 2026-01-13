import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Link } from "expo-router"
import CustomInput from "@/components/CustomInput"
import CustomButton from "@/components/CustomButton"
import { signInWithOAuthAPI } from "@/api/auth.api"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthContext"

const OAuthExchange = () => {
  const { signIn } = useAuth()
  const [code, setCode] = useState("")

  const signInMutation = useMutation({
    mutationFn: signInWithOAuthAPI,
    onSuccess: ({ access_token }) => {
      signIn(access_token)
    },
  })

  const { mutate, isPending, isError, error } = signInMutation

  return (
    <View className="gap-6 bg-white rounded-lg p-5 mt-5">
      <CustomInput 
          label="Code"
          placeholder="Enter oauth code"
          value={code}
          onChangeText={text => setCode(text)}
          secureTextEntry={true}
        />

      {isError && (
        <Text className="text-red-500 text-sm text-center">
          {error.message}
        </Text>
      )}

      <CustomButton 
        title = "Sign In"
        onPress={() => mutate(code)}
        isLoading={isPending}
      />

      <View>
        <Link href="/sign-in" className="base-bold text-primary text-center">
          Go back to Sign In page
        </Link>
      </View>
    </View>
  )
}

export default OAuthExchange