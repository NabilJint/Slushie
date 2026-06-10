import "../global.css";

import { useEffect, useRef } from "react";
import { Stack, router, usePathname, useGlobalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { PostHogProvider } from "posthog-react-native";
import { tokenCache } from "@/lib/token-cache";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/use-language-store";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { isSignedIn, isLoaded } = useAuth();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, { previous_screen: previousPathname.current ?? null, ...params });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  useEffect(() => {
    if (isLoaded && isSignedIn && !selectedLanguageId && pathname !== "/language-select") {
      router.replace("/language-select");
    }
  }, [isLoaded, isSignedIn, selectedLanguageId, pathname]);

  if (!isLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    />
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <PostHogProvider
        client={posthog}
        autocapture={{
          captureScreens: true,
          captureTouches: true,
          propsToCapture: ["testID"],
          maxElementsCaptured: 20,
        }}
      >
        <RootLayoutContent />
      </PostHogProvider>
    </ClerkProvider>
  );
}
