import { useAuth } from "@clerk/expo";
import { Redirect, Stack, type Href } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={"/" as Href} />;
  }

  return <Stack />;
}
