import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-paper-white pb-24">
      <Text className="text-display">Profile</Text>
      <Text className="text-tagline mt-2">Your progress and settings</Text>
    </View>
  );
}
