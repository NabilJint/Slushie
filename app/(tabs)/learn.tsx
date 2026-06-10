import { View, Text } from "react-native";

export default function LearnScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-paper-white pb-24">
      <Text className="text-display">Learn</Text>
      <Text className="text-tagline mt-2">Your lessons will appear here</Text>
    </View>
  );
}
