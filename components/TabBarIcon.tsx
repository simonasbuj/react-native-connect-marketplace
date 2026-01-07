import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import cn from "clsx"

interface TabBarIconProps {
    focused: boolean
    icon: ImageSourcePropType
    title: string
}

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
  return (
    <View className="tab-icon">
        <Image 
            source={icon} 
            className="size-7" 
            resizeMode="contain" 
            tintColor={focused ? "#FE8C00" : "#5D5F6D"}
        />
        <Text className={cn("text-sm font-bold", focused ? "text-primary" : "text-gray-200")}>{title}</Text>
    </View>
  )
}

export default TabBarIcon