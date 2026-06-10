import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, type Href } from "expo-router";
import { useSignUp } from "@clerk/expo";
import { usePostHog } from "posthog-react-native";
import BackButton from "@/components/BackButton";
import AuthField from "@/components/AuthField";
import SocialAuthSection from "@/components/SocialAuthSection";
import MascotAuth from "@/components/MascotAuth";
import VerificationCodeModal from "@/components/VerificationCodeModal";
import Button from "@/components/ui/Button";

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const posthog = usePostHog();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setSignUpError(null);

    const { error } = await signUp.password({
      emailAddress: email,
      password,
    });
    if (error) {
      console.error("signUp.password error:", error);
      setSignUpError(error.message);
      posthog.capture("sign_up_failed", { error_message: error.message });
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      console.error("signUp.verifications.sendEmailCode error:", sendError);
      setSignUpError(sendError.message);
      posthog.capture("sign_up_failed", { error_message: sendError.message });
      return;
    }

    setShowVerification(true);
    setVerifyError(null);
  };

  const handleVerify = async (code: string) => {
    const { error: verifyErr } =
      await signUp.verifications.verifyEmailCode({ code });
    if (verifyErr) {
      setVerifyError(verifyErr.message);
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize();
      const userId = signUp.createdUserId;
      if (userId) {
        posthog.identify(userId, {
          $set_once: { sign_up_date: new Date().toISOString() },
        });
      }
      posthog.capture("sign_up_completed");
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
              Create your account
            </Text>
            <Text className="font-body text-carbon/50 text-base">
              Start your language journey today ✨
            </Text>
          </View>

          <MascotAuth />

          <View className="gap-4 mt-2">
            <AuthField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
            />
            {errors.fields.emailAddress && (
              <Text className="text-ember font-body text-sm">
                {errors.fields.emailAddress.message}
              </Text>
            )}
            <AuthField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />
            {errors.fields.password && (
              <Text className="text-ember font-body text-sm">
                {errors.fields.password.message}
              </Text>
            )}
          </View>

          <Button
            title={fetchStatus === "fetching" ? "Creating account..." : "Sign Up"}
            onPress={handleSignUp}
            disabled={fetchStatus === "fetching"}
            loading={fetchStatus === "fetching"}
            className="mt-6"
          />

          <SocialAuthSection />

          <View className="flex-row justify-center items-center mt-8 mb-6">
            <Text className="text-carbon/50 font-body text-sm">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.replace("/sign-in" as Href)}
            >
              <Text className="text-voltage-violet font-display text-sm font-semibold">
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {signUpError ? (
        <View className="px-6 pb-2">
          <Text className="text-ember font-body text-sm">{signUpError}</Text>
        </View>
      ) : null}
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
