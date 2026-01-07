import { images } from "@/constants";
import { Fragment } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from "clsx";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "@/components/LoadingIndicator";
import PageLoadError from "@/components/PageLoadError";
import { fetchCategoriesQueryOptions } from "@/api/listingsQueryOptions";
 

export default function Index() {
    const { data, isLoading, error, refetch } = useQuery(fetchCategoriesQueryOptions)

    if (isLoading) return (
        <LoadingIndicator text="Loading categories"/>
    )

    if (error) return (
        <PageLoadError message={error.message} reloadFn={refetch}/>
    )

    return (
        <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
            <FlatList 
                data={data}
                renderItem={({ item, index }) => {
                    const isEven = index % 2 == 0

                    return (
                        <View>
                            <Pressable 
                                className={cn("category-card", isEven ? "flex-row-reverse" : "flex-row")} 
                                style={{ backgroundColor: item.color, overflow: "hidden" }}
                                android_ripple={{ color: "#ffff22" }}
                                onPress={() => console.log("selected category: ", item.title)}
                            >
                                {({ pressed }) => (
                                    <Fragment>
                                        <View className="h-full w-1/2">
                                            <Image 
                                                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${item.image_path}` }} 
                                                className="size-full" 
                                                resizeMode="cover" 
                                            />
                                        </View>
                                        <View className={cn("category-card__info", isEven ? "pl-10" : "pr-10")}>
                                            <Text className="h1-bold text-white leading-tight">{item.title.toUpperCase()}</Text>
                                            <Image 
                                                source={images.arrowRight} 
                                                className="size-10"
                                                resizeMode="contain"
                                                tintColor="#ffffff"
                                            />
                                        </View>
                                    </Fragment>
                                )}
                            </Pressable>
                        </View>
                    )
                }}
                contentContainerClassName="pb-28 px-2"
                ListHeaderComponent={() => (
                    <View className="flex-between flex-row w-full my-1 px-5">
                        <View className="flex-start">
                            <Text className="font-bold">Categories</Text>
                        </View>
                    </View>
                )}  
            />
        </SafeAreaView>
    );
}