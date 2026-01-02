import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 

type Listing = {
  id: number
  title: string
  price_in_cents: number
  currency: string
};

const API_URL = "http://192.168.1.137:6767/api/v1/listings";

export default function Sandbox() {
  const [listings, setListings] = useState<Listing[]>([]);
  
  const onTouch = async () => {
    console.log("im touched at ", new Date().toISOString())

    try {
      console.log("starting api call to ", API_URL)
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Listings:", data);
      setListings(data.data.listings)
    } catch (error) {
      console.error("API error:", error);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center p-4">
        <Text
          onPress={onTouch}
          className="font-quicksand-bold text-3xl text-center text-primary border-4 border-primary p-4 rounded-lg mb-4"
        >
          Welcome to Nativewindzzz!
        </Text>

        <FlatList
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className="font-quicksand text-center text-lg my-2">
              {item.title}: <Text className="font-quicksand-bold">{item.price_in_cents} {item.currency}</Text>
            </Text>
          )}
          contentContainerStyle={{ paddingTop: 20 }}
          ListEmptyComponent={
            <Text className="text-gray-400 text-lg mt-4">
              No listings yet. Press the button!
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}