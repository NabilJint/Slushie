import { Text, View, Image, TouchableOpacity, SafeAreaView, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, type Href } from "expo-router";
import { images } from "@/constants/images";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const handleGetStarted = () => {
    router.replace("/" as Href);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />

      <View className="flex-row items-center justify-center mt-4 mb-10 ">
        <Image
          source={images.mascotLogo}
          className="size-60 mr-3"
          resizeMode="contain"
        />
        <Text className="text-carbon font-display text-2xl font-bold tracking-tight text-center">
          Slushie
        </Text>
      </View>

      <View className="px-10 mb-6">
        <Text className="font-display text-carbon text-3xl font-bold text-left mb-4 leading-tight">
          Your AI language{" "}
          <Text className="text-voltage-violet">teacher.</Text>
        </Text>
        <Text className="font-body text-left text-carbon/60 text-base leading-relaxed">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>
      </View>

      <View className="flex-1 justify-center items-center w-full relative px-6">
        <View className="absolute left-10 top-50 bg-paper-white border border-carbon px-4 py-2 rounded-2xl rotate-[-6deg]">
          <Text className="font-body text-carbon text-sm font-medium">
            Hello!
          </Text>
        </View>

        <View className="absolute right-15 top-24 bg-paper-white border border-carbon px-4 py-2 rounded-2xl rotate-[8deg]">
          <Text className="font-body text-voltage-violet text-sm font-semibold">
            ¡Hola!
          </Text>
        </View>

        <View className="absolute right-10 bottom-36 bg-paper-white border border-carbon px-4 py-2 rounded-2xl rotate-[-4deg]">
          <Text className="font-body text-ember text-sm font-medium">
            你好!
          </Text>
        </View>

        <Image
          source={images.mascotWelcome}
          style={{ width: width * 0.72, height: width * 0.72 }}
          resizeMode="contain"
          className="z-10"
        />
      </View>

      <View className="px-8 pb-10 w-full items-center">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleGetStarted}
          className="w-full flex-row justify-between items-center bg-voltage-violet border border-carbon rounded-pills h-14 px-6"
        >
          <View className="w-5" />
          <Text className="text-paper-white text-lg font-bold text-center font-display">
            Get Started
          </Text>
          <Text className="text-paper-white font-display text-lg font-bold">
            {`>`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

