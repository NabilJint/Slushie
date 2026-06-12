import { Text, View, Modal } from "react-native";
import Button from "@/components/ui/Button";

interface LessonCompleteModalProps {
  visible: boolean;
  lessonTitle: string;
  xpReward: number;
  onContinue: () => void;
}

export default function LessonCompleteModal({
  visible,
  lessonTitle,
  xpReward,
  onContinue,
}: LessonCompleteModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-[85%] bg-paper-white border border-carbon rounded-[28px] p-6 items-center">
          <Text style={{ fontSize: 64 }} className="mb-4">
            🎉
          </Text>
          <Text className="font-display text-carbon text-2xl font-bold text-center mb-2">
            Lesson Complete!
          </Text>
          <Text className="font-body text-carbon/60 text-center mb-6">
            You completed the AI Teacher audio session for {lessonTitle} and
            earned {xpReward} XP!
          </Text>
          <View className="bg-sky-wash border border-carbon rounded-[16px] px-5 py-3 items-center mb-6 w-full">
            <Text className="font-display text-carbon text-sm font-bold">
              Reward Added
            </Text>
            <Text className="font-display text-electric-blue text-xl font-extrabold mt-1">
              +{xpReward} XP
            </Text>
          </View>
          <Button
            title="Continue"
            onPress={onContinue}
            className="py-4 bg-carbon w-full"
          />
        </View>
      </View>
    </Modal>
  );
}
