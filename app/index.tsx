import { useAuth, useUser, useClerk } from "@clerk/expo";
import { Redirect, router, type Href } from "expo-router";
import { View, Text, ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/ui/Button";
import { useLanguageStore } from "@/store/use-language-store";
import { getLanguageById } from "@/data/languages";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const clearSelectedLanguage = useLanguageStore((state) => state.clearSelectedLanguage);
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const selectedLanguage = selectedLanguageId ? getLanguageById(selectedLanguageId) : null;

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#5c4ade" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href={"/onboarding" as Href} />;
  }

  return (
    <View className="flex-1 surface-primary items-center justify-center px-8">
      <View className="items-center gap-4">
        <Text className="text-display">Welcome to Slushie</Text>
        <Text className="text-tagline">
          {user?.emailAddresses?.[0]?.emailAddress ?? "Ready to learn!"}
        </Text>
        {selectedLanguage && (
          <View className="flex-row items-center gap-2 mt-2">
            <Image
              source={{ uri: selectedLanguage.flagEmoji }}
              style={{ width: 28, height: 28 }}
              resizeMode="contain"
            />
            <Text className="text-carbon font-display text-subheading">
              Learning: {selectedLanguage.name}
            </Text>
          </View>
        )}
        <Button
          title="Choose a Language"
          onPress={() => router.push("/language-select" as Href)}
          className="mt-4"
        />
        <Button
          title="Sign Out"
          variant="ghost"
          onPress={() => signOut()}
          className="mt-2"
        />
        <Button
          title="Clear Storage"
          variant="outlined"
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("language-storage");
            } catch (e) {
              console.error("Failed to clear language storage:", e);
            }
            clearSelectedLanguage();
          }}
          className="mt-2"
        />
      </View>
    </View>
  );
}
