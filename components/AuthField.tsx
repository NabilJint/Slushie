import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface AuthFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address";
  secureTextEntry?: boolean;
}

export default function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
}: AuthFieldProps) {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View className="w-full bg-paper-white border border-concrete-gray rounded-2xl px-4 py-3 flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-carbon/40 font-body text-xs mb-1">{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          className="text-carbon font-body text-base p-0 m-0"
          autoCapitalize="none"
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#cccccc"
        />
      </View>
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          className="p-1"
          activeOpacity={0.7}
          accessibilityLabel={isSecure ? "Show password" : "Hide password"}
          accessibilityRole="button"
        >
          <SymbolView
            name={isSecure ? "eye" : "eye.slash"}
            size={22}
            tintColor="#999999"
            resizeMode="scaleAspectFit"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
