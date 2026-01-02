import { categoryImages, images } from "@/constants";
import { Fragment, useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from "clsx";
 
const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/categories`;

type Category = {
  id: string
  title: string
  description: string
  color: string
};

export default function Index() {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        console.log("fetching from: ", API_URL)
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setCategories(data.data)
        } catch (error) {
            console.error("fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList 
                data={categories}
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
                                                source={categoryImages[item.title.toLowerCase()]} 
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