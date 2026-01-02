import { categoryImages } from "@/constants";
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
                            <Pressable className={cn("category-card", isEven ? "flex-row-reverse" : "flex-row")} style={{ backgroundColor: item.color }}>
                                {({ pressed }) => (
                                    <Fragment>
                                        <View className="h-full w-1/2">
                                            <Image source={categoryImages[item.title.toLowerCase()]} className="size-full" resizeMode="contain" />
                                        </View>
                                        <View className="category-card__info">
                                            <Text className="text-white font-quicksand-bold">{item.title.toUpperCase()}</Text>
                                        </View>
                                    </Fragment>
                                )}
                            </Pressable>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    );
}