import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

interface CallControlButtonProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  isActive?: boolean;
  isDanger?: boolean;
}

export default function CallControlButton({
  label,
  icon,
  onPress,
  isActive = true,
  isDanger = false,
}: CallControlButtonProps) {
  const bgClass = isDanger
    ? "bg-ember"
    : isActive
      ? "bg-paper-white"
      : "bg-soft-mist/80";
  const iconColor = isDanger ? "#ffffff" : colors.carbon;

  return (
    <View className="items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        className={`w-14 h-14 rounded-full border border-carbon items-center justify-center ${bgClass}`}
      >
        <Ionicons name={icon} size={22} color={iconColor} />
      </TouchableOpacity>
      <Text className="text-white text-xs font-bold mt-1.5 uppercase font-display tracking-wide">
        {label}
      </Text>
    </View>
  );
}
