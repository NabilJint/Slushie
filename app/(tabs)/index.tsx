import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useUser } from "@clerk/expo";
import { usePostHog } from "posthog-react-native";
import { useLanguageStore } from "@/store/use-language-store";
import { getLanguageById } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images } from "@/constants/images";

const GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  it: "Ciao",
  ja: "こんにちは",
  ko: "안녕하세요",
  zh: "你好",
};

export default function HomeScreen() {
  const { user } = useUser();
  const posthog = usePostHog();
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);

  const language = getLanguageById(selectedLanguageId ?? "");
  const units = getUnitsByLanguage(selectedLanguageId ?? "");
  const firstUnit = units[0];
  const firstLesson = firstUnit ? getLessonsByUnit(firstUnit.id)[0] : null;

  const displayName = user?.firstName ?? "Learner";
  const greeting = language ? (GREETINGS[language.languageCode] ?? "Hello") : "Hello";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />

      <View className="flex-row items-center justify-between px-6 py-3 border-b border-soft-mist">
        <View className="flex-row items-center">
          <View className="w-9 h-9 rounded-full overflow-hidden bg-soft-mist items-center justify-center mr-3 border border-carbon">
            {language?.flagEmoji ? (
              <Image source={{ uri: language.flagEmoji }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <Text style={{ fontSize: 22 }}>🌍</Text>
            )}
          </View>
          <Text className="font-display text-carbon text-lg font-bold">
            {greeting}, {displayName}! 👋
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center bg-soft-mist/40 px-3 py-1.5 rounded-full border border-soft-mist">
            <Image source={images.streakFire} className="w-9 h-9 mr-1" resizeMode="contain" />
            <Text className="font-display text-carbon font-bold text-sm">12</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} className="w-9 h-9 items-center justify-center relative">
            <Text style={{ fontSize: 22 }}>🔔</Text>
            <View className="absolute top-1 right-1 w-2.5 h-2.5 bg-ember rounded-full border border-paper-white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1 px-5 pt-4"
      >
        <View className="w-full bg-soft-mist/30 rounded-2xl p-5 flex-row items-center justify-between border border-carbon mb-4">
          <View className="flex-1 mr-4">
            <Text className="text-carbon/50 font-body text-sm mb-2">Daily goal</Text>
            <View className="flex-row items-baseline mb-3">
              <Text className="font-display text-carbon text-2xl font-bold">15</Text>
              <Text className="text-carbon/40 font-body text-base"> / 20 XP</Text>
            </View>
            <View className="w-full h-3 bg-concrete-gray/30 rounded-full overflow-hidden">
              <View style={{ width: "75%" }} className="h-full bg-ember rounded-full" />
            </View>
          </View>
          <View className="w-28 h-28 items-center justify-center -mr-2">
            <Image source={images.treasure} className="w-full h-full" resizeMode="cover" />
          </View>
        </View>

        <View className="w-full bg-voltage-violet rounded-3xl p-6 relative overflow-hidden mb-6 border border-carbon">
          <View style={{ transform: [{ scale: 1.25 }, { translateX: 48 }] }} className="absolute right-0 top-0 bottom-0 left-1/3 bg-electric-blue/10 rounded-l-full" />

          <View className="z-10 w-3/5">
            <Text className="text-paper-white/70 font-body text-sm mb-1">Continue learning</Text>
            <Text className="text-paper-white font-display text-2xl font-bold mb-1">
              {language?.name ?? "Spanish"}
            </Text>
            <Text className="text-paper-white/60 font-body text-xs mb-5">
              A1 • {firstUnit?.title ?? "Unit 1"}
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-paper-white rounded-xl py-2.5 px-5 self-start border border-carbon"
              onPress={() =>
                posthog.capture("continue_learning_tapped", {
                  language_id: selectedLanguageId,
                  unit_id: firstUnit?.id ?? null,
                  lesson_id: firstLesson?.id ?? null,
                })
              }
            >
              <Text className="text-voltage-violet font-display text-sm font-bold">
                Continue
              </Text>
            </TouchableOpacity>
          </View>

          <View className="absolute right-4 bottom-0 top-4 justify-end items-center w-2/5">
            <Image source={images.palace} className="w-full h-full" resizeMode="contain" />
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-carbon font-display text-lg font-bold">Today&apos;s plan</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-voltage-violet font-display text-sm font-semibold">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-3 mb-6">
          <View className="w-full flex-row items-center justify-between p-3 bg-paper-white rounded-2xl border border-carbon">
            <View className="flex-row items-center flex-1">
              <View className="w-14 h-14 bg-voltage-violet/10 rounded-xl items-center justify-center mr-4">
                <Text style={{ fontSize: 28 }}>📖</Text>
              </View>
              <View>
                <Text className="text-carbon font-display text-base font-semibold mb-0.5">Lesson</Text>
                <Text className="text-carbon/40 font-body text-xs">
                  {firstLesson?.title ?? "At the café"}
                </Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full bg-voltage-violet items-center justify-center mr-1">
              <Text className="text-paper-white font-display text-xs font-bold">✓</Text>
            </View>
          </View>

          <View className="w-full flex-row items-center justify-between p-3 bg-paper-white rounded-2xl border border-carbon">
            <View className="flex-row items-center flex-1">
              <View className="w-14 h-14 bg-electric-blue/10 rounded-xl items-center justify-center mr-4">
                <Text style={{ fontSize: 28 }}>🎧</Text>
              </View>
              <View>
                <Text className="text-carbon font-display text-base font-semibold mb-0.5">AI Conversation</Text>
                <Text className="text-carbon/40 font-body text-xs">Talk about your day</Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full border border-concrete-gray mr-1" />
          </View>

          <View className="w-full flex-row items-center justify-between p-3 bg-paper-white rounded-2xl border border-carbon">
            <View className="flex-row items-center flex-1">
              <View className="w-14 h-14 bg-ember/10 rounded-xl items-center justify-center mr-4">
                <Text style={{ fontSize: 28 }}>🦊</Text>
              </View>
              <View>
                <Text className="text-carbon font-display text-base font-semibold mb-0.5">New words</Text>
                <Text className="text-carbon/40 font-body text-xs">10 words</Text>
              </View>
            </View>
            <View className="w-6 h-6 rounded-full border border-concrete-gray mr-1" />
          </View>
        </View>

        <View className="w-full bg-mint-pop/10 rounded-2xl p-4 flex-row items-center justify-between border border-carbon mb-6">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-14 h-14 rounded-full overflow-hidden bg-concrete-gray mr-4 border border-carbon/10">
              <Image
                source={images.mascotAuth}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className="text-mint-pop font-display text-xs font-bold uppercase tracking-wider mb-0.5">Next up</Text>
              <Text className="text-carbon font-display text-base font-bold mb-0.5">AI Video Call</Text>
              <Text className="text-carbon/40 font-body text-xs">Practice speaking</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="w-12 h-12 bg-mint-pop rounded-full items-center justify-center"
            onPress={() =>
              posthog.capture("ai_video_call_started", {
                language_id: selectedLanguageId,
              })
            }
          >
            <Text style={{ fontSize: 20 }}>📹</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


