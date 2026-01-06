import { signUpAPI, SignUpPayload } from "@/api/auth.api"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { useMutation } from "@tanstack/react-query"
import { Link } from 'expo-router'
import { useState } from "react"
import { View, Text } from 'react-native'

const SignUp = () => {
  const [isSignedUp, setIsSignedUp] = useState(false)

  const [form, setForm] = useState<SignUpPayload>({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordVerify: ""
  })

  const updateField = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

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
            value={form.username}
            onChangeText={text => updateField("username", text)}
          />
          <CustomInput 
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            onChangeText={text => updateField("email", text)}
            keyboardType="email-address"
          />
          <CustomInput 
            label="Firstname"
            placeholder="Enter your firstname"
            value={form.firstname}
            onChangeText={text => updateField("firstname", text)}
          />
          <CustomInput 
            label="Lastname"
            placeholder="Enter your lastname"
            value={form.lastname}
            onChangeText={text => updateField("lastname", text)}
          />
          <CustomInput 
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChangeText={text => updateField("password", text)}
            secureTextEntry={true}
          />

          <CustomInput 
            label="Repeat Password"
            placeholder="Repeat password"
            value={form.passwordVerify}
            onChangeText={text => updateField("passwordVerify", text)}
            secureTextEntry={true}
          />

          {isError && (
            <Text className="text-red-500 text-sm text-center">
              {error.message}
            </Text>
          )}

          <CustomButton 
            title = "Sign Up"
            onPress={() => mutate(form)}
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