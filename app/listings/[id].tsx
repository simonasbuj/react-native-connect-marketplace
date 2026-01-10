import { View, Text, FlatList, Image, Pressable, Dimensions, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchListing, LISTINGS_QUERY_KEYS } from "@/api/listings.api";
import LoadingIndicator from "@/components/LoadingIndicator";
import PageLoadError from "@/components/PageLoadError";
import { images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";


const { width } = Dimensions.get('window');


const ListingPage = () => {
  const params = useLocalSearchParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: LISTINGS_QUERY_KEYS.fetchListing(id),
    queryFn: () => fetchListing({id: id}),
    staleTime: 60 * 1000,
  })

  if (isLoading) {
    return <LoadingIndicator text="Fetching listing data"/>
  }
  
  if (error) {
    return <PageLoadError message={error.message} reloadFn={refetch}/>
  }

  const diffMs = new Date().getTime() - new Date(data?.seller?.created_at!).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const daysSince = diffDays === 0 ? "today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <ScrollView>
        <View className="aspect-[3/4] w-full">
          <FlatList
            data={data?.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image
                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.path}` }}
                className="w-screen h-full"
                resizeMode="cover"
              />
            )}
          />
        </View>

        <View className="flex-1 w-full bg-white px-8 pt-5">
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-bold text-slate-900 tracking-tight leading-tight font-quicksand-bold">
                {data?.title}
              </Text>
            </View>
            
            <View className="bg-green-50 px-3 py-2 rounded-2xl">
              <Text className="text-xl font-extrabold text-green-700">
                {((data?.price_in_cents ?? 0) / 100).toFixed(2)} {data?.currency}
              </Text>
            </View>
          </View>

          <View className="h-[1px] w-full bg-slate-100 my-2" />

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-1">
              Description
            </Text>
            <Text className="text-base text-slate-500 leading-7">
              {data?.description}
            </Text>
          </View>

          <View className="h-[1px] w-full bg-slate-100 my-4" />
          
          <View className="mb-4">
            <Text className="text-lg font-semibold text-slate-800 mb-1">
              Seller
            </Text>
            <Text className="text-base text-slate-700">
              <Text className="font-semibold text-primary">@{data?.seller.username}</Text>
              <Text className="text-slate-500"> joined the marketplace {daysSince}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View className="pb-6 px-4">
        <CustomButton title="BUY" textStyle="font-quicksand-bold shadow-xl"/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300, 
    marginTop: 50,
  },
  image: {
    width: width, // The image fills the screen width
    height: '100%',
    resizeMode: 'cover',
  },
});


export default ListingPage