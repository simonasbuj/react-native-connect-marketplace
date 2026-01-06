import { Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./CustomButton"

interface PageLoadErrorProps {
    message: string
    reloadFn: () => void
}

const PageLoadError = ({
    message,
    reloadFn,
}: PageLoadErrorProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center px-4">
        <Text className="text-red-500 mb-4 text-center">
            {message}
        </Text>

        <CustomButton onPress={reloadFn} title="Retry" style="w-1/4 p-2" />
    </SafeAreaView>
  )
}

export default PageLoadError