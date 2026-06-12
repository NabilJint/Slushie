import { useState, useMemo } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useLanguageStore } from "@/store/use-language-store";
import { useLessonStore } from "@/store/use-lesson-store";
import LessonCard from "@/components/LessonCard";
import Button from "@/components/ui/Button";
import { getLanguageById } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images } from "@/constants/images";

type TabKey = "lessons" | "practice";

const UNIT_STICKERS: Record<string, string> = {
  Basics: "🦊",
  "Food & Drink": "☕️",
};

const LESSON_STICKERS: Record<number, string> = {
  0: "📖",
  1: "🗣️",
  2: "☕️",
  3: "🗺️",
  4: "🛍️",
  5: "👨‍👩‍👧‍👦",
  6: "🏖️",
  7: "💼",
};

export default function LessonScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("lessons");
  const selectedLanguageId = useLanguageStore((state) => state.selectedLanguageId);
  const lessonStatuses = useLessonStore((state) => state.lessonStatuses);


  const language = getLanguageById(selectedLanguageId ?? "");
  const units = getUnitsByLanguage(selectedLanguageId ?? "");

  const unitLessonMap = useMemo(() => {
    return units.map((unit) => ({
      unit,
      lessons: getLessonsByUnit(unit.id),
    }));
  }, [units]);

  const firstUnit = unitLessonMap[0];
  const completedLessonsInFirstUnit = firstUnit?.lessons.filter(
    (l) => lessonStatuses[l.id] === "completed"
  ).length ?? 0;
  const totalLessonsInFirstUnit = firstUnit?.lessons.length ?? 0;

  const heroTitle = firstUnit?.unit.title ?? "Basics";
  const heroSubtitle = firstUnit
    ? `Unit ${firstUnit.unit.order} • ${completedLessonsInFirstUnit} / ${totalLessonsInFirstUnit} lessons`
    : "";

  const handleLessonPress = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/(tabs)");
    }
  };

  if (!language || !selectedLanguageId) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-display mb-4">📚</Text>
          <Text className="font-display text-xl text-carbon font-bold mb-2">No language selected</Text>
          <Text className="font-body text-carbon/60 text-center mb-6">
            Choose a language to start learning.
          </Text>
            <Button title="Select Language" onPress={() => router.push("/language-select")} className="px-8" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <View className="bg-sky-wash w-full pt-10 pb-20 px-6  relative">
          <View className="h-24 mb-6 relative">
            <View className="absolute inset-0 flex-row items-center justify-center px-16">
              <View className="items-center justify-center">
                <Text className="text-carbon font-display text-xl font-bold text-center">
                  {heroTitle}
                </Text>
                {heroSubtitle ? (
                  <Text className="text-carbon/70 font-body text-sm text-center mt-1">
                    {heroSubtitle}
                  </Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleBack}
              className="absolute left-0 top-1 w-11 h-11 rounded-full bg-paper-white border border-carbon items-center justify-center"
            >
              <Text className="text-carbon font-display text-2xl font-bold">‹</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="absolute right-0 top-1 w-11 h-11 rounded-full bg-paper-white border border-carbon items-center justify-center"
            >
              <Text className="text-carbon text-lg">🔖</Text>
            </TouchableOpacity>
          </View>

          <View className="w-full items-center mb-4">
            <Image
              source={images.mascotWelcome}
              className="w-full h-27.5 absolute mt-auto"
              resizeMode="contain"
            />
          </View>

          <View className="w-full flex-row items-center justify-between z-10">
            <View className="w-32 h-32 rounded-cards bg-paper-white border border-carbon p-2 rotate-[-4deg] justify-center items-center">
              <Text style={{ fontSize: 12 }}>{UNIT_STICKERS[firstUnit?.unit.title ?? ""] ?? "🦊"}</Text>
            </View>

            <View className="items-end gap-2">
              <View className="bg-mint-pop border border-carbon rounded-cards px-3 py-2 rotate-[6deg]">
                <Text className="text-carbon font-display text-xs font-bold">
                  {language.languageCode === "es" ? "☕️ CAFE OPEN" :
                   language.languageCode === "fr" ? "🥐 BONJOUR" :
                   language.languageCode === "de" ? "🍺 WILLKOMMEN" :
                   language.languageCode === "it" ? "🍝 BUONGIORNO" :
                   language.languageCode === "ja" ? "🗾 こんにちは" :
                   language.languageCode === "ko" ? "🇰🇷 안녕하세요" :
                   "🌍 HELLO"}
                </Text>
              </View>
              <View className="bg-sunburst border border-carbon rounded-full w-14 h-14 items-center justify-center rotate-[-12deg]">
                <Text style={{ fontSize: 24 }}>
                  {language.languageCode === "es" ? "🌳" :
                   language.languageCode === "fr" ? "🗼" :
                   language.languageCode === "de" ? "🏰" :
                   language.languageCode === "it" ? "🏛️" :
                   language.languageCode === "ja" ? "⛩️" :
                   language.languageCode === "ko" ? "🏯" :
                   language.languageCode === "zh" ? "🏮" :
                   "🌳"}
                </Text>
              </View>
            </View>
          </View>

          <View className="absolute bottom-[-28px] left-6 right-6 h-14 bg-electric-blue border border-carbon rounded-pills z-20 items-center justify-center rotate-[-1deg]">
            <Text className="text-paper-white font-display text-lg font-bold tracking-wide uppercase">
              ✨ {language.name} Learning Guide ✨
            </Text>
          </View>
        </View>

        <View className="px-6 mt-14 mb-8">
          <View className="bg-soft-mist border border-carbon rounded-pills p-1.5 flex-row">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setActiveTab("lessons")}
              className={`flex-1 py-4 rounded-pills items-center justify-center ${activeTab === "lessons" ? "bg-carbon" : "bg-transparent"}`}
            >
              <Text className={`font-display text-base font-bold ${activeTab === "lessons" ? "text-paper-white" : "text-carbon/60"}`}>
                Lessons
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setActiveTab("practice")}
              className={`flex-1 py-4 rounded-pills items-center justify-center ${activeTab === "practice" ? "bg-carbon" : "bg-transparent"}`}
            >
              <Text className={`font-display text-base font-bold ${activeTab === "practice" ? "text-paper-white" : "text-carbon/60"}`}>
                Practice
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === "lessons" ? (
          <View className="px-6 gap-10">
            {unitLessonMap.map(({ unit, lessons }) => (
              <View key={unit.id}>
                <View className="flex-row items-center mb-4">
                  <View className="w-10 h-10 rounded-full bg-lavender border border-carbon items-center justify-center mr-3">
                    <Text className="text-lg">{UNIT_STICKERS[unit.title] ?? "📚"}</Text>
                  </View>
                  <Text className="font-display text-carbon text-2xl font-bold flex-1">{unit.title}</Text>
                  <Text className="font-body text-carbon/50 text-sm font-medium">
                    {lessons.filter((l) => lessonStatuses[l.id] === "completed").length}/{lessons.length}
                  </Text>
                </View>

                <View className="gap-4">
                  {lessons.map((lesson, index) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      status={lessonStatuses[lesson.id] ?? "locked"}
                      sticker={lesson.sticker ?? LESSON_STICKERS[index % 8] ?? "📖"}
                      onPress={() => handleLessonPress(lesson.id)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className="px-6">
            <View className="bg-soft-mist/50 border border-concrete-gray rounded-cards p-6 items-center">
              <Text style={{ fontSize: 48 }} className="mb-3">🏋️</Text>
              <Text className="font-display text-carbon text-lg font-bold mb-1">Practice Mode</Text>
              <Text className="font-body text-carbon/60 text-center">
                Review past lessons and strengthen your skills.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 h-24 bg-paper-white border-t-2 border-carbon flex-row items-center justify-around px-2 pb-3 z-30">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)")}
          className="items-center justify-center pt-2 flex-1"
        >
          <Text style={{ fontSize: 24 }} className="opacity-40 mb-1">🏠</Text>
          <Text className="font-body text-sm font-medium text-carbon/40">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} className="items-center justify-center pt-2 flex-1">
          <Text style={{ fontSize: 26 }} className="mb-0.5">📖</Text>
          <Text className="font-display text-sm font-bold text-voltage-violet">Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)/ai-teacher")}
          className="items-center justify-center pt-2 flex-1"
        >
          <Text style={{ fontSize: 24 }} className="opacity-40 mb-1">🤖</Text>
          <Text className="font-body text-sm font-medium text-carbon/40">AI Teacher</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)/chat")}
          className="items-center justify-center pt-2 flex-1"
        >
          <Text style={{ fontSize: 24 }} className="opacity-40 mb-1">💬</Text>
          <Text className="font-body text-sm font-medium text-carbon/40">Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)/profile")}
          className="items-center justify-center pt-2 flex-1"
        >
          <Text style={{ fontSize: 24 }} className="opacity-40 mb-1">👤</Text>
          <Text className="font-body text-sm font-medium text-carbon/40">Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
