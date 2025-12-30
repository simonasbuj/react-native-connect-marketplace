import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 

type Listing = {
  id: number;
  title: string;
  price_in_cents: number;
};

const API_URL = "http://192.168.1.137:6767/api/v1/listings";

export default function Index() {
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
      <View className="items-center mt-4">
        <Text
          onPress={onTouch}
          className="font-quicksand-bold text-3xl text-center text-primary border-4 border-primary p-4 rounded-lg"
        >
          Welcome to Nativewindzzz!
        </Text>
      </View>

      {/* FlatList centered vertically in remaining space */}
      <View className="flex-1 justify-center">
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text className="text-center text-lg my-2">
              {item.title}: {item.price_in_cents}
            </Text>
          )}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: listings.length === 0 ? 'center' : 'flex-start',
            flexGrow: 1,
          }}
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