import CustomButton from "@/components/CustomButton"
import { useAuth } from "@/context/AuthContext"
import { View, Text } from 'react-native'

const Profile = () => {
  const { signOut, user } = useAuth()

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-4 text-lg">User ID: {user?.sub}</Text>
      <CustomButton
        onPress={signOut}
        title="Sign Out"
      />
    </View>
  )
}

export default Profile