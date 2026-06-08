import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import type { Href } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 surface-primary items-center justify-center px-8">
      <View className="items-center gap-8">
        <Text className="text-display">Welcome to Slushie</Text>
        <Text className="text-tagline">Your AI-powered language learning app</Text>

        <Link href={"/onboarding" as Href} asChild>
          <TouchableOpacity className="btn-filled w-full" activeOpacity={0.8}>
            <Text className="btn-filled-text">Onboarding</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
