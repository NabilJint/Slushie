import { Text, View, TouchableOpacity } from "react-native";
import type { Lesson } from "@/types/learning";
import type { LessonStatus } from "@/store/use-lesson-store";

interface LessonCardProps {
  lesson: Lesson;
  status: LessonStatus;
  sticker: string;
  onPress: () => void;
}

export default function LessonCard({ lesson, status, sticker, onPress }: LessonCardProps) {
  if (status === "completed") {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View className="bg-paper-white border border-carbon rounded-cards p-6 flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-carbon/40 font-body text-sm font-medium">
              Lesson {lesson.order}
            </Text>
            <Text className="text-carbon font-display text-xl font-bold mt-1">
              {lesson.title}
            </Text>
            <Text className="text-carbon/40 font-body text-sm mt-1">
              {lesson.description}
            </Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-mint-pop border border-carbon items-center justify-center">
            <Text className="text-carbon font-display text-lg font-bold">✓</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (status === "in_progress") {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        className="bg-lavender border-2 border-carbon rounded-cards p-6 flex-row items-center justify-between relative overflow-hidden"
      >
        <View className="flex-1 z-10 mr-5">
          <Text className="text-voltage-violet font-display text-sm font-bold uppercase tracking-wider">
            Lesson {lesson.order}
          </Text>
          <Text className="text-carbon font-display text-2xl font-bold mt-1 mb-3">
            {lesson.title}
          </Text>
          <View className="bg-carbon self-start rounded-pills px-4 py-1.5">
            <Text className="text-paper-white font-body text-sm font-bold uppercase">In Progress</Text>
          </View>
        </View>

        <View className="w-20 h-20 bg-paper-white border border-carbon rounded-cards items-center justify-center rotate-[10deg]">
          <Text style={{ fontSize: 36 }}>{sticker}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View className="bg-soft-mist/50 border border-concrete-gray rounded-cards p-6 flex-row items-center justify-between">
        <View className="flex-1 mr-4 opacity-40">
          <Text className="text-carbon font-body text-sm font-medium">
            Lesson {lesson.order}
          </Text>
          <Text className="text-carbon font-display text-xl font-bold mt-1">
            {lesson.title}
          </Text>
        </View>
        <View className="w-12 h-12 rounded-full bg-soft-mist border border-concrete-gray items-center justify-center">
          <Text style={{ fontSize: 20 }} className="opacity-50">🔒</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
