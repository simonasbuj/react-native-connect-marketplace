import { fetchListings, LISTINGS_QUERY_KEYS } from "@/api/listings.api";
import { images } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useGlobalSearchParams } from 'expo-router';
import { View, Text, Button, FlatList, Image  } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryPage() {
  const { category } = useGlobalSearchParams();
  const categoryStr = Array.isArray(category) ? category[0] : category;
  const router = useRouter();

  const { data, isLoading, error, refetch } = useQuery({
      queryKey: LISTINGS_QUERY_KEYS.fetchListings(categoryStr, ""),
      queryFn: () => fetchListings({category: categoryStr, keyword: ""})
  })


  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <View className="flex-between flex-row w-full my-1 px-5">
          <View className="flex-start">
              <Text className="font-bold">Categories / {category}</Text>
          </View>
      </View>
      <View className="px-5">
        <Text>Search Bar</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperClassName="gap-3"
        contentContainerClassName="px-4 py-3 gap-3 pb-10"
        renderItem={({ item }) => (
          <View className="flex-1 bg-white rounded-2xl pb-3  shadow-md">
            <View className="w-full aspect-[2/3] rounded-xl mb-3 overflow-hidden bg-gray-100">
              <Image
                source={
                  item.images?.[0]?.path
                    ? { uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.images[0].path}` }
                    : images.noImages
                }
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text
              className="text-sm font-semibold text-gray-900 text-center"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text className="mt-1 text-base font-bold text-primary text-center">
              {(item.price_in_cents / 100).toFixed(2)} {item.currency}
            </Text>
          </View>
        )}
      />

    </SafeAreaView>
  )
}
