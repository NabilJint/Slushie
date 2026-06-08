import { View, Text, Image } from "react-native";
import { images } from "@/constants/images";

export default function Index() {
  return (
    <View className="flex-1 surface-primary items-center justify-center px-8">
      <View className="items-center mb-12">
        <Image
          source={images.mascotLogo}
          className="w-24 h-24 mb-6"
          resizeMode="contain"
        />
        <Text className="text-display mb-3">Duolingo</Text>
        <Text className="text-tagline max-w-xs">
          Learn languages with AI-powered lessons
        </Text>
      </View>

      <View className="w-full gap-4">
        <View className="btn-filled">
          <Text className="btn-filled-text">Get started</Text>
        </View>

        <View className="btn-outlined">
          <Text className="btn-outlined-text">I already have an account</Text>
        </View>
      </View>
    </View>
  );
}
