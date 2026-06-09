import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <TouchableOpacity
      className="p-2 -ml-2"
      activeOpacity={0.7}
      onPress={() => router.back()}
    >
      <Text className="text-carbon font-display text-2xl font-bold">
        {"‹"}
      </Text>
    </TouchableOpacity>
  );
}
