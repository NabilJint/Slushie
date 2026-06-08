Read AGENTS.md first and follow it strictly.

Implement the onboarding screen as shown in the attached design exactly as is using assets from the assets folder. Add a navigation link on the home route (/) to open the onboarding screen. Use the mascot-logo image for the top logo alongside the app name “Slushie", and do not include the pagination dots.

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-paper-white">
      <StatusBar style="dark" />

      {/* 1. Header Module (Mascot & Brand Title Layout Row) */}
      <View className="flex-row items-center justify-center mt-4 mb-10 h-10">
        {/* <Image
          source={require("./assets/mascot-auth.png")}
          className="w-8 h-8 mr-2"
          resizeMode="contain"
        /> */}
        <Text className="text-carbon font-display text-2xl font-bold tracking-tight甚至 text-center">
          slush
        </Text>
      </View>

      {/* 2. Primary Layout Typography Wrapper Block */}
      <View className="px-10 items-center mb-6">
        <Text className="font-display text-carbon text-3xl font-bold text-center mb-4 leading-tight">
          Your AI language <Text className="text-voltage-violet">teacher.</Text>
        </Text>

        <Text className="font-body text-center text-carbon/60 text-base leading-relaxed px-2">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>
      </View>

      {/* 3. Hero Sticker / Collage Dynamic Container Canvas */}
      <View className="flex-1 justify-center items-center w-full relative px-6">
        {/* Floating Accent Bubble Left: "Hello!" */}
        <View
          style={styles.shadowOffset}
          className="tag left-6 top-6 bg-paper-white border border-carbon px-4 py-2 rounded-2xl rotate-[-6deg]"
        >
          <Text className="font-body text-carbon text-sm font-medium">
            Hello!
          </Text>
        </View>

        {/* Floating Accent Bubble Right: "¡Hola!" */}
        <View
          style={styles.shadowOffset}
          className="tag right-12 top-2 bg-paper-white border border-carbon px-4 py-2 rounded-2xl rotate-[8deg]"
        >
          <Text className="font-body text-voltage-violet text-sm font-semibold">
            ¡Hola!
          </Text>
        </View>

        {/* Floating Accent Bubble Bottom Right: "你好!" */}
        <View
          style={styles.shadowOffset}
          className="tag right-6 bottom-16 bg-paper-white border border-carbon px-4 py-2 rounded-2xl rotate-[-4deg]"
        >
          <Text className="font-body text-ember text-sm font-medium">
            你好!
          </Text>
        </View>

        {/* Central Character Hero Asset Illustration */}
        {/* <Image
          source={require("./assets/mascot-auth.png")}
          style={{ width: width * 0.72, height: width * 0.72 }}
          resizeMode="contain"
          className="z-10"
        /> */}
      </View>

      {/* 4. Interface Footer Navigation & Action Control Stack */}
      <View className="px-8 pb-10 w-full items-center">
        {/* Carousel Linear Page Pagination Reference Indicators */}
        <View className="flex-row space-x-2 justify-center items-center mb-8 gap-2">
          <View className="w-2.5 h-2.5 rounded-full bg-voltage-violet" />
          <View className="w-2.5 h-2.5 rounded-full bg-concrete-gray" />
          <View className="w-2.5 h-2.5 rounded-full bg-concrete-gray" />
          <View className="w-2.5 h-2.5 rounded-full bg-concrete-gray" />
        </View>

        {/* Core Screen Interaction Target Component (Primary CTA) */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.shadowButton}
          className="btn-filled w-full flex-row justify-between items-center bg-voltage-violet h-14 px-6"
        >
          {/* Layout spacer for absolute text balance alignment */}
          <View className="w-5" />

          <Text className="btn-filled-text text-lg font-bold text-center">
            Get Started
          </Text>

          {/* Hard-coded graphic system string font matching style guide '>' */}
          <Text className="text-paper-white font-display text-lg font-bold">
            {`>`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Preserving strict 2D vector flat borders cleanly using shadow overrides to match structural parameters
  shadowOffset: {
    borderWidth: 1,
    borderColor: "#000000",
  },
  shadowButton: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 1600,
  },
});
