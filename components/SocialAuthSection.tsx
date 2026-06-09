import { Text, View } from "react-native";
import SocialButton from "./SocialButton";

const PROVIDERS = [
  { icon: "G", iconColor: "#ef4444", label: "Continue with Google" },
  { icon: "f", iconColor: "#2563eb", label: "Continue with Facebook" },
  { icon: "\uF8FF", iconColor: "#000000", label: "Continue with Apple" },
] as const;

export default function SocialAuthSection() {
  const handleSocialPress = (provider: string) => {
    // TODO: Implement social authentication for provider
    console.log(`Authenticating with ${provider}`);
  };

  return (
    <>
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-concrete-gray/50" />
        <Text className="px-4 text-carbon/40 font-body text-sm">
          or continue with
        </Text>
        <View className="flex-1 h-[1px] bg-concrete-gray/50" />
      </View>

      <View className="gap-3">
        {PROVIDERS.map((provider) => (
          <SocialButton
            key={provider.label}
            icon={provider.icon}
            iconColor={provider.iconColor}
            label={provider.label}
            onPress={() => handleSocialPress(provider.label)}
          />
        ))}
      </View>
    </>
  );
}
