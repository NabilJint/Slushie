import { Text, TouchableOpacity, ActivityIndicator, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "filled" | "outlined" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = "filled",
  disabled = false,
  loading = false,
  className,
  textClassName,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const containerClass =
    variant === "filled" ? "btn-filled" :
    variant === "outlined" ? "btn-outlined" :
    "btn-ghost";

  const textClass =
    variant === "filled" ? "btn-filled-text" :
    variant === "outlined" ? "btn-outlined-text " :
    "btn-ghost-text";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled || loading}
      className={`w-full items-center justify-center ${containerClass} ${className || ""}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "filled" ? "#ffffff" : "#000000"} />
      ) : (
        <View className="flex-row items-center">
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text className={`${textClass} ${textClassName || ""}`}>{title}</Text>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}
