import { View, Text } from "react-native";

export default function ChatScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-paper-white pb-24">
      <Text className="text-display">Chat</Text>
      <Text className="text-tagline mt-2">AI tutor conversations</Text>
    </View>
  );
}
