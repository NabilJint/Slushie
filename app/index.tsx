import { useAuth, useUser, useClerk } from "@clerk/expo";
import { Redirect, router, type Href } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import Button from "@/components/ui/Button";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

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
      </View>
    </View>
  );
}
