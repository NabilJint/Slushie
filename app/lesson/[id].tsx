import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { getLessonById } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLessonStore } from "@/store/use-lesson-store";
import Button from "@/components/ui/Button";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id ?? "");
  const unit = lesson ? getUnitById(lesson.unitId) : null;
  const setLessonStatus = useLessonStore((state) => state.setLessonStatus);

  const handleStartLesson = async () => {
    if (!lesson) return;
    const prevStatus = useLessonStore.getState().getLessonStatus(lesson.id);
    setLessonStatus(lesson.id, "in_progress");
    try {
      await router.push(`/lesson/audio/${lesson.id}`);
    } catch {
      setLessonStatus(lesson.id, prevStatus ?? "not_started");
    }
  };

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <StatusBar style="dark" />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-display mb-4">🔍</Text>
          <Text className="font-display text-xl text-carbon font-bold mb-2">Lesson not found</Text>
          <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />

      <View className="flex-1 px-6 pt-4">
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-paper-white border border-carbon items-center justify-center"
          >
            <Text className="text-carbon font-display text-lg font-bold">
              ‹
            </Text>
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-carbon/40 font-body text-xs">
              Lesson {lesson.order}
            </Text>
            <Text className="text-carbon font-display text-sm font-bold">
              {unit?.title ?? ""}
            </Text>
          </View>
          <View className="w-10" />
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="w-24 h-24 bg-lavender border border-carbon rounded-cards items-center justify-center mb-6 rotate-[6deg]">
            <Text style={{ fontSize: 48 }}>{lesson.sticker ?? "📖"}</Text>
          </View>

          <Text className="font-display text-carbon text-3xl font-bold text-center mb-2">
            {lesson.title}
          </Text>
          <Text className="font-body text-carbon/60 text-center mb-8 max-w-xs">
            {lesson.description}
          </Text>

          <View className="flex-row gap-4 mb-8">
            <View className="bg-soft-mist/50 border min-w-60 border-carbon rounded-cards px-4 py-3 items-center">
              <Text className="font-display text-carbon text-sm font-bold">
                {lesson.xpReward}
              </Text>
              <Text className="font-body text-carbon/40 text-xs mt-1">XP</Text>
            </View>
            <View className="bg-soft-mist/50 border min-w-60 border-carbon rounded-cards px-4 py-3 items-center">
              <Text className="font-display text-carbon text-sm font-bold">
                {lesson.estimatedMinutes}
              </Text>
              <Text className="font-body text-carbon/40 text-xs mt-1">
                Minutes
              </Text>
            </View>
            <View className="bg-soft-mist/50 border min-w-60 border-carbon rounded-cards px-4 py-3 items-center">
              <Text className="font-display text-carbon text-sm font-bold">
                {lesson.activities.length}
              </Text>
              <Text className="font-body text-carbon/40 text-xs mt-1">
                Activities
              </Text>
            </View>
          </View>

          <View className="bg-sky-wash border border-carbon rounded-cards p-5 w-full mb-6">
            <Text className="font-display text-carbon text-sm font-bold mb-2">
              Lesson Goals
            </Text>
            {lesson.goals.map((goal) => (
              <View key={goal.id} className="flex-row items-center mb-1.5">
                <Text className="text-electric-blue mr-2">✦</Text>
                <Text className="font-body text-carbon/70 text-sm flex-1">
                  {goal.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="pb-6">
          <Button
            title="Start Lesson"
            onPress={handleStartLesson}
            className="py-4"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
