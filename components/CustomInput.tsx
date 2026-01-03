import { View, Text } from 'react-native'
import React from 'react'

interface CustomInputProps {
    placeholder?: string
    value?: string
    onChangeText?: (text: string) => void
    label: string
    secureTextEntry?: boolean,
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
}

const CustomInput = ({ 
    placeholder = "Enter text", 
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType="default"
}: CustomInputProps) => {
  return (
    <View>
      <Text>CustomInput</Text>
    </View>
  )
}

export default CustomInput