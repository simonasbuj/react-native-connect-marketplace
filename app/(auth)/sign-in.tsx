import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { Link, router } from 'expo-router'
import { useState } from "react"
import { View, Text } from 'react-native'

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

      <CustomButton 
        title = "Sign In"
        onPress={() => console.log("email:", email, "| password:", password)}
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