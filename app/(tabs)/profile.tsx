import { linkSellerAPI } from "@/api/payments.api";
import CustomButton from "@/components/CustomButton"
import { useAuth } from "@/context/AuthContext"
import { useMutation } from "@tanstack/react-query";
import { View, Text, Platform } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from 'expo-web-browser';
import { toast } from 'sonner-native';

const Profile = () => {
  const { signOut, user, accessToken } = useAuth()

  const initial = user?.sub ? user.sub.charAt(0).toUpperCase() : "U"

  const { mutate: linkSellerMutate, isPending } = useMutation({
    mutationFn: (token: string) => linkSellerAPI(token),
    onSuccess: async (data) => {
      if (data?.url) {
        await WebBrowser.openBrowserAsync(data.url)
        setTimeout(() => { // android is really annoying, this sleep is only because of android
          toast.success("Seller account updated")
        }, 500)        
      }
    },
    onError: (e) => {
      toast.error(e.message)
    }
  })

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-10">
        <View className="items-center mb-12">
          <View className="h-24 w-24 bg-slate-900 rounded-full items-center justify-center mb-6 shadow-xl shadow-slate-200">
            <Text className="text-4xl font-bold text-white">{"SB"}</Text>
          </View>

          <Text className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
            User ID
          </Text>
          <View className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
             <Text className="text-lg font-semibold text-slate-900 tracking-tight">
               {user?.sub || "Unknown User"}
             </Text>
          </View>
        </View>
        
        <View className="flex-1">
            <View className="bg-blue-50 p-6 rounded-[24px] border border-blue-100 mb-6">
                <View className="mb-4">
                    <Text className="text-xl font-bold text-blue-950 mb-1">Seller Mode</Text>
                    <Text className="text-blue-900/60 leading-5">Link your account to start selling.</Text>
                </View>
                
                <CustomButton
                    onPress={() => linkSellerMutate(accessToken!)}
                    style="bg-blue-600 shadow-sm shadow-blue-300 rounded-xl"
                    textStyle="text-white font-quicksand-bold"
                    title="Link Seller Account"
                    isLoading={isPending}
                />
            </View>
            <View className="mb-4">
        </View>
        </View>

        <View className="mb-4">
            <CustomButton
                onPress={signOut}
                title="Sign Out"
                style="bg-white border-2 border-slate-100 mb-[100px]"
                textStyle="text-slate-600 font-quicksand-bold"
            />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Profile