import { router } from 'expo-router'
import { View, Text, Button } from 'react-native'

const SignUp = () => {
  return (
    <View>
      <Text>SignUp page</Text>
      <Button title='Already have an account? Sign In' onPress={() => router.replace("/sign-in")}/>
    </View>
  )
}

export default SignUp