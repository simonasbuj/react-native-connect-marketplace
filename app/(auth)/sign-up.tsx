import CustomInput from "@/components/CustomInput"
import { Link, router } from 'expo-router'
import { View, Text, Button } from 'react-native'

const SignUp = () => {
  return (
    <View className="gap-6 bg-white rounded-lg p-5 mt-5">
      <View>
        <Text className="base-regular text-gray-100 text-center">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary text-center">
          Sign In
        </Link>
      </View>
    </View>
  )
}

export default SignUp