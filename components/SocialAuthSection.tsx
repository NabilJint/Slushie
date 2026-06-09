import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { Text, View } from "react-native";
import SocialButton from "./SocialButton";

const PROVIDERS = [
  { strategy: "oauth_google" as const, icon: "G", iconColor: "#ef4444", label: "Continue with Google" },
  { strategy: "oauth_facebook" as const, icon: "f", iconColor: "#2563eb", label: "Continue with Facebook" },
  { strategy: "oauth_apple" as const, icon: "\uF8FF", iconColor: "#000000", label: "Continue with Apple" },
] as const;

export default function SocialAuthSection() {
  const { startSSOFlow } = useSSO();

  const handleSocialPress = async (strategy: typeof PROVIDERS[number]["strategy"]) => {
    try {
      const { createdSessionId, setActive, authSessionResult } =
        await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (authSessionResult?.type !== "success") {
        return;
      }

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error(`OAuth error with ${strategy}:`, err);
    }
  };

  return (
    <>
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-[1px] bg-carbon/20" />
        <Text className="px-4 text-carbon/50 font-body text-sm">
          or continue with
        </Text>
        <View className="flex-1 h-[1px] bg-carbon/20" />
      </View>

      <View className="gap-3">
        {PROVIDERS.map((provider) => (
          <SocialButton
            key={provider.label}
            icon={provider.icon}
            iconColor={provider.iconColor}
            label={provider.label}
            onPress={() => handleSocialPress(provider.strategy)}
          />
        ))}
      </View>
    </>
  );
}
