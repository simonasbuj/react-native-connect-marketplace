import { View, Text, FlatList, Image, Pressable, Dimensions, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchListing, LISTINGS_QUERY_KEYS } from "@/api/listings.api";
import LoadingIndicator from "@/components/LoadingIndicator";
import PageLoadError from "@/components/PageLoadError";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Seperator from "@/components/Seperator";
import { getBackgroundColorAsync, setBackgroundColorAsync } from "expo-system-ui";


const { width } = Dimensions.get('window');

const ListingPage = () => {
  const params = useLocalSearchParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const [currentIndex, setCurrentIndex] = useState(0)
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width)
    setCurrentIndex(index)
  }

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
            onScroll={handleScroll}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image
                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.path}` }}
                className="w-screen h-full"
                resizeMode="cover"
              />
            )}
          />
          <View className="absolute bottom-2 left-0 right-0 flex-row justify-center">
            {data?.images.map((_, i) => (
              <View
                key={i.toString()}
                className={`mx-1 h-2 w-2 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </View>
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

          <Seperator />

          <View>
            <Text className="text-lg font-semibold text-slate-800 mb-1">
              Description
            </Text>
            <Text className="text-base text-slate-500 leading-7">
              {data?.description}
            </Text>
          </View>

          <Seperator/>
          
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