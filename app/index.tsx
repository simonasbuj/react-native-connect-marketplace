import { Text, View } from "react-native";
 

const API_URL = "http://10.0.2.2:6767/api/v1/listings";

export default function Index() {

  const onTouch = async () => {
    console.log("im touched at ", new Date().toISOString())

    try {
      console.log("starting api call to ", API_URL)
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("finished api call to ", API_URL)
      console.log("Listings:", data);
    } catch (error) {
      console.log("hi")
      console.error("API error:", error);
    }
    console.log("bye")
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text onPress={onTouch} className="font-quicksand-bold text-3xl text-center text-primary  border-4 border-primary p-4 rounded-lg ">
        Welcome to Nativewindzzz!
      </Text>
    </View>
  );
}