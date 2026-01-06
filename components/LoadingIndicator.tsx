import { Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

interface LoadingIndicatorProps {
    text: string
    color?: string
}

const LoadingIndicator = ({
    text,
    color = "black"
}: LoadingIndicatorProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text>{text}</Text>
        <ActivityIndicator size="small" color={color} />
    </SafeAreaView>
  )
}

export default LoadingIndicator