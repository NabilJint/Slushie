import { TextInput, View } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  className?: string;
  inputClassName?: string;
}

export default function Input({
  value,
  onChangeText,
  placeholder,
  leftIcon,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  className,
  inputClassName,
}: InputProps) {
  return (
    <View
      className={`w-full bg-paper-white border border-carbon/30 rounded-2xl px-4 flex-row items-center ${className || ""}`}
      style={{ height: 52 }}
    >
      {leftIcon && <View className="mr-3">{leftIcon}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#cccccc"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className={`flex-1 text-carbon font-body text-base p-0 m-0 ${inputClassName || ""}`}
      />
    </View>
  );
}
