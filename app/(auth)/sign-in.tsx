import { router } from 'expo-router'
import { View, Text, Button } from 'react-native'

const SignIn = () => {
  return (
    <View>
      <Text>SignIn Page</Text>
      <Button title="Dont' have an account? Sign Up" onPress={() => router.replace("/sign-up")}/>
    </View>
  )
}

export default SignIn