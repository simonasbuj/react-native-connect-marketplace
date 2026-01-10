import { View } from 'react-native'
import React from 'react'
import cn from "clsx"

interface SeperatorProps {
    style?: string
}

const Seperator = ({style}: SeperatorProps) => {
  return (
    <View className={cn("h-[1px] w-full bg-slate-100 my-2", style)} />
  )
}

export default Seperator