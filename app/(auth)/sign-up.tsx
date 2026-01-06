import { signUpAPI } from "@/api/auth.api"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { useMutation } from "@tanstack/react-query"
import { Link } from 'expo-router'
import { useState } from "react"
import { View, Text } from 'react-native'

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [passwordVerify, setPasswordVerify] = useState("")

  const [isSignedUp, setIsSignedUp] = useState(false)

  const signUpMutation = useMutation({
    mutationFn: signUpAPI,
    onSuccess: () => {
      setIsSignedUp(true)
    },
  })

  const { mutate, isPending, isError, error } = signUpMutation
  
  return (
    <View className="gap-3 bg-white rounded-lg p-5 mt-5">
      {!isSignedUp ? (
        <>
          <CustomInput 
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            keyboardType="email-address"
          />
          <CustomInput 
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <CustomInput 
            label="Firstname"
            placeholder="Enter your firstname"
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
            keyboardType="email-address"
          />
          <CustomInput 
            label="Lastname"
            placeholder="Enter your lastname"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            keyboardType="email-address"
          />
          <CustomInput 
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <CustomInput 
            label="Repeat Password"
            placeholder="Repeat password"
            value={passwordVerify}
            onChangeText={(text) => setPasswordVerify(text)}
            secureTextEntry={true}
          />

          {isError && (
            <Text className="text-red-500 text-sm text-center">
              {error.message}
            </Text>
          )}

          <CustomButton 
            title = "Sign Up"
            onPress={() => mutate({username, email, firstname, lastname, password, passwordVerify})}
            isLoading={isPending}
          />
          <View>
            <Text className="base-regular text-gray-100 text-center">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="base-bold text-primary text-center">
              Sign In
            </Link>
          </View>
        </>
        ) :(
        <>
          <Text className="text-green-600 text-lg text-center font-semibold mt-10">
            Signed up successfully
          </Text>

          <Link href="/sign-in" className="base-bold text-primary text-center">
            You can Sign In now
          </Link>
        </>
        )}
    </View>
  )
}

export default SignUp