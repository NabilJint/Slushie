import { useLanguageStore } from "@/store/use-language-store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function LearnScreen() {
  const selectedLanguageId = useLanguageStore(
    (state) => state.selectedLanguageId,
  );

  useEffect(() => {
    if (selectedLanguageId) {
      router.replace("/lesson");
    }
  }, [selectedLanguageId, router]);

  if (!selectedLanguageId) {
    return (
      <View className="flex-1 items-center justify-center bg-paper-white pb-24">
        <Text className="text-display">📚</Text>
        <Text className="font-display text-carbon text-lg font-bold mt-4">
          Select a language first
        </Text>
        <Text className="font-body text-carbon/60 mt-2">
          Go to Home to choose a language.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-paper-white pb-24">
      <Text className="text-display">📚</Text>
      <Text className="font-body text-carbon/60 mt-4">Loading lessons...</Text>
    </View>
  );
}
