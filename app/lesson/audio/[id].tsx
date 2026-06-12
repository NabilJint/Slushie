import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { images } from "@/constants/images";
import { useAudioSession } from "@/hooks/useAudioSession";
import CallControlButton from "@/components/CallControlButton";
import FeedbackPanel from "@/components/FeedbackPanel";
import LessonCompleteModal from "@/components/LessonCompleteModal";
import Button from "@/components/ui/Button";

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    lesson, unit, language, isMuted, setIsMuted, isCameraOn, setIsCameraOn,
    showSubtitles, setShowSubtitles, bubbleText, bubbleTranslation, status,
    speakingScore, pronunciationScore, grammarScore, showCongrats, setShowCongrats,
    label, micIcon, micBg, micLbl, micDisabled, handleMic, handleNext,
  } = useAudioSession(id ?? "");

  if (!lesson || !unit || !language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-display mb-4">🔍</Text>
          <Text className="font-display text-xl text-carbon font-bold mb-2">Lesson data error</Text>
          <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.paperWhite }}>
      <StatusBar style="dark" />
      <View className="flex-row items-center justify-between px-6 pt-2 pb-4 border-b border-carbon/10">
        <View className="flex-row items-center">
          <TouchableOpacity activeOpacity={0.8}
            onPress={() => Alert.alert("End Lesson?", "Are you sure?", [
              { text: "Cancel", style: "cancel" },
              { text: "Yes, Exit", style: "destructive", onPress: () => router.back() },
            ])}
            className="w-10 h-10 rounded-full border border-carbon items-center justify-center mr-3 bg-paper-white">
            <Ionicons name="chevron-back" size={20} color={colors.carbon} />
          </TouchableOpacity>
          <View>
            <Text className="font-display text-carbon text-lg font-bold">AI Teacher</Text>
            <View className="flex-row items-center mt-0.5">
              <View className="w-2 h-2 rounded-full bg-mint-pop mr-1.5" />
              <Text className="font-body text-carbon/50 text-xs font-semibold uppercase tracking-wider">
                {language.name} • Online
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-2.5">
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIsCameraOn(!isCameraOn)}
            className={`w-10 h-10 rounded-full border border-carbon items-center justify-center ${isCameraOn ? "bg-electric-blue" : "bg-paper-white"}`}>
            <Ionicons name={isCameraOn ? "videocam" : "videocam-off"} size={18}
              color={isCameraOn ? "#fff" : colors.carbon} />
          </TouchableOpacity>
          <View className="w-10 h-10 rounded-full border border-carbon items-center justify-center bg-paper-white">
            <Text className="font-display text-carbon text-xs font-bold">{lesson.xpReward}</Text>
          </View>
          <View className="w-10 h-10 rounded-full border border-carbon items-center justify-center bg-paper-white">
            <Ionicons name="person" size={16} color={colors.carbon} />
          </View>
        </View>
      </View>

      <View className="flex-1 px-6 pt-4 pb-2">
        <View className="flex-1 bg-sky-wash/30 border border-carbon rounded-[24px] overflow-hidden relative justify-center items-center">
          <View className="absolute top-4 left-4 bg-carbon/60 rounded-full px-3 py-1 z-10">
            <Text className="text-white text-xs font-bold uppercase tracking-widest">{label}</Text>
          </View>
          <View className="items-center justify-center w-full h-full max-h-[300px]">
            <Image source={images.mascotTeacher} className="w-[200px] h-[200px]" resizeMode="contain" />
          </View>
          <View className="absolute bottom-[92px] left-6 right-6 z-10">
            <View className="bg-paper-white border border-carbon rounded-[20px] p-4 flex-row items-center justify-between relative">
              <View className="flex-1 pr-3">
                <Text className="font-display text-carbon text-base font-bold">{bubbleText}</Text>
                {showSubtitles && bubbleTranslation ? (
                  <Text className="font-body text-carbon/50 text-sm mt-1">{bubbleTranslation}</Text>
                ) : null}
              </View>
              <TouchableOpacity activeOpacity={0.7}
                onPress={() => Alert.alert("Audio Played", `Simulated voice: "${bubbleText}"`)}
                className="w-9 h-9 rounded-full bg-electric-blue/10 items-center justify-center border border-carbon">
                <Ionicons name="volume-medium" size={18} color={colors.electricBlue} />
              </TouchableOpacity>
              <View style={{
                position: "absolute", bottom: -10, left: 40, width: 0, height: 0,
                backgroundColor: "transparent", borderStyle: "solid",
                borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 10,
                borderLeftColor: "transparent", borderRightColor: "transparent",
                borderBottomColor: colors.carbon, transform: [{ rotate: "180deg" }],
              }} />
            </View>
          </View>
          <View className="absolute bottom-4 left-4 right-4 flex-row justify-around items-center">
            <CallControlButton label="Camera" icon={isCameraOn ? "videocam" : "videocam-off"}
              onPress={() => setIsCameraOn(!isCameraOn)} isActive={isCameraOn} />
            <View className="items-center">
              <TouchableOpacity activeOpacity={0.8} onPress={handleMic}
                onLongPress={() => setIsMuted(!isMuted)} disabled={micDisabled}
                className={`w-14 h-14 rounded-full border border-carbon items-center justify-center ${micBg}`}>
                <Ionicons name={micIcon} size={24} color={isMuted ? "#fff" : colors.carbon} />
              </TouchableOpacity>
              <Text className="text-white text-xs font-bold mt-1.5 uppercase font-display tracking-wide">{micLbl}</Text>
            </View>
            <CallControlButton label="Subtitles" icon="language"
              onPress={() => setShowSubtitles(!showSubtitles)} isActive={showSubtitles} />
            <CallControlButton label="End Call" icon="close" isDanger
              onPress={() => Alert.alert("End Lesson?", "Are you sure you want to end this AI Teacher session?", [
                { text: "Cancel", style: "cancel" },
                { text: "Yes, Exit", style: "destructive", onPress: () => router.back() },
              ])} />
          </View>
        </View>
      </View>

      <FeedbackPanel speaking={speakingScore} pronunciation={pronunciationScore} grammar={grammarScore} />

      <View className="px-6 pt-2 pb-6">
        {status === "success" ? (
          <Button title="Next Phrase" onPress={handleNext} className="py-4 bg-carbon"
            rightIcon={<Ionicons name="arrow-forward" size={16} color="#fff" />} />
        ) : status === "speaking" ? (
          <Button title="Respond" onPress={handleMic} className="py-4 bg-electric-blue" textClassName="text-white"
            leftIcon={<Ionicons name="mic" size={16} color="#fff" />} />
        ) : status === "listening" ? (
          <Button title="Tap when finished speaking" onPress={handleMic}
            className="py-4 bg-mint-pop" textClassName="text-carbon" />
        ) : (
          <Button title={status === "processing" ? "Evaluating response..." : "AI Call Connecting..."}
            onPress={() => {}} disabled className="py-4 bg-soft-mist" />
        )}
      </View>

      <LessonCompleteModal
        visible={showCongrats}
        lessonTitle={lesson.title}
        xpReward={lesson.xpReward}
        onContinue={() => { setShowCongrats(false); router.replace("/lesson"); }}
      />
    </SafeAreaView>
  );
}
