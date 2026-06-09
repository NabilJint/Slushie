import { Text, TouchableOpacity } from "react-native";

interface SocialButtonProps {
  icon: string;
  iconColor: string;
  label: string;
  onPress?: () => void;
}

export default function SocialButton({
  icon,
  iconColor,
  label,
  onPress,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="w-full bg-paper-white border border-carbon/30 rounded-2xl h-14 flex-row items-center justify-center px-6"
    >
      <Text
        className="font-display font-bold text-xl mr-3"
        style={{ color: iconColor }}
      >
        {icon}
      </Text>
      <Text className="text-carbon font-body text-base font-medium">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
