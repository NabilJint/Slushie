import AuthField from "@/components/AuthField";
import BackButton from "@/components/BackButton";
import MascotAuth from "@/components/MascotAuth";
import SocialAuthSection from "@/components/SocialAuthSection";
import VerificationCodeModal from "@/components/VerificationCodeModal";
import { useSignIn } from "@clerk/expo";
import { router, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return email.trim().length > 0 && EMAIL_REGEX.test(email.trim());
}

export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const handleLogIn = async () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");

    const { error: createError } = await signIn.create({
      identifier: email,
    });
    if (createError) {
      return;
    }

    const { error: sendError } = await signIn.emailCode.sendCode({
      emailAddress: email,
    });
    if (sendError) {
      return;
    }

    setShowVerification(true);
    setVerifyError(null);
  };

  const handleVerify = async (code: string) => {
    const { error: verifyErr } = await signIn.emailCode.verifyCode({ code });
    if (verifyErr) {
      setVerifyError(verifyErr.message);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize();
      setShowVerification(false);
      router.replace("/" as Href);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="px-6"
        >
          <View className="pt-4 pb-2 justify-start items-start">
            <BackButton />
          </View>

          <View className="mt-2 mb-4">
            <Text className="font-display text-carbon text-3xl font-bold tracking-tight mb-2">
              Welcome back
            </Text>
            <Text className="font-body text-carbon/50 text-base">
              Continue your language journey
            </Text>
          </View>

          <MascotAuth />

          <View className="gap-4 mt-2">
            <AuthField
              label="Email"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (emailError) setEmailError("");
              }}
              placeholder="you@example.com"
              keyboardType="email-address"
            />
            {emailError ? (
              <Text className="text-ember font-body text-sm mt-2">
                {emailError}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleLogIn}
            disabled={fetchStatus === "fetching"}
            className="w-full bg-voltage-violet rounded-2xl h-14 items-center justify-center mt-6"
          >
            <Text className="text-paper-white font-display text-lg font-semibold">
              {fetchStatus === "fetching" ? "Sending code..." : "Log in"}
            </Text>
          </TouchableOpacity>

          <SocialAuthSection />

          <View className="flex-row justify-center items-center mt-8 mb-6">
            <Text className="text-carbon/50 font-body text-sm">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/sign-up" as Href)}
            >
              <Text className="text-voltage-violet font-display text-sm font-semibold">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationCodeModal
        visible={showVerification}
        email={email.trim()}
        onClose={() => {
          setShowVerification(false);
          setVerifyError(null);
        }}
        onVerify={handleVerify}
        error={verifyError}
      />
    </SafeAreaView>
  );
}
