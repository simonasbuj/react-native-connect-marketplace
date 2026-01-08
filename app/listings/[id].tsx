import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from "expo-router";

const ListingPage = () => {
const { id } = useGlobalSearchParams()

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-4 text-4xl font-bold">Listing Page</Text>
      <Text>{id}</Text>
    </View>
  )
}

export default ListingPage