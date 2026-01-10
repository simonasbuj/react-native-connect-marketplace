import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons"

interface ProfileMenuItemProps {
    label: string
    iconName: React.ComponentProps<typeof Feather>['name']
    onPress: () => void
}

const ProfileMenuItem = ({label, iconName, onPress}: ProfileMenuItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm shadow-slate-200"
      android_ripple={{ color: '#e5e7eb', borderless: false }}
    >
      <View className="flex-row items-center gap-2">
        <Feather name={iconName} size={20} color="#334155" />
        <Text className="text-slate-900 font-quicksand-bold text-base">{label}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#9ca3af" />
    </Pressable>
  )
}

export default ProfileMenuItem