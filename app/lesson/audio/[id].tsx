import { useState, useEffect, useMemo } from "react";
import {
  Text, View, Image, TouchableOpacity, SafeAreaView, Alert, Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getLessonById } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { getLanguageById } from "@/data/languages";
import { useLessonStore } from "@/store/use-lesson-store";
import { images } from "@/constants/images";
import { colors } from "@/constants/theme";
import Button from "@/components/ui/Button";
import CallControlButton from "@/components/CallControlButton";
import FeedbackPanel from "@/components/FeedbackPanel";

const SCORES = ["Excellent", "Great", "Good"] as const;
type SessionStatus = "connecting" | "speaking" | "listening" | "processing" | "success" | "finished";
const randScore = () => SCORES[Math.floor(Math.random() * SCORES.length)];
const pick = <T,>(cond: boolean, a: T, b: T) => cond ? a : b;

export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id ?? "");
  const unit = lesson ? getUnitById(lesson.unitId) : undefined;
  const language = unit ? getLanguageById(unit.languageId) : undefined;
  const setLessonStatus = useLessonStore((s) => s.setLessonStatus);

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<SessionStatus>("connecting");
  const [bubbleText, setBubbleText] = useState("");
  const [bubbleTranslation, setBubbleTranslation] = useState("");
  const [speakingScore, setSpeakingScore] = useState("Excellent");
  const [pronunciationScore, setPronunciationScore] = useState("Great");
  const [grammarScore, setGrammarScore] = useState("Good");
  const [showCongrats, setShowCongrats] = useState(false);

  const steps = useMemo(() => {
    if (!lesson) return [];
    const r: { phrase: string; translation: string; instruction: string; teacherPrompt: string }[] = [];
    for (const act of lesson.activities) {
      if (act.type === "vocabulary-intro" && "items" in act) {
        for (const item of act.items) r.push({
          phrase: item.word, translation: item.translation,
          instruction: "Listen and repeat the vocabulary",
          teacherPrompt: `Repeat after me: "${item.word}"`,
        });
      } else if (act.type === "speak" && "expectedResponse" in act) {
        r.push({
          phrase: act.expectedResponse, translation: act.instruction || act.prompt,
          instruction: act.instruction,
          teacherPrompt: act.agentPrompt || `Can you say "${act.expectedResponse}"?`,
        });
      } else if (act.type === "listen-repeat" && "text" in act) {
        r.push({
          phrase: act.text, translation: act.translation,
          instruction: act.instruction,
          teacherPrompt: `Let's practice: "${act.text}"`,
        });
      }
    }
    if (r.length === 0) r.push({
      phrase: lesson.title, translation: lesson.description,
      instruction: "Practice lesson theme",
      teacherPrompt: `Welcome to the lesson: "${lesson.title}". Say it back.`,
    });
    return r;
  }, [lesson]);

  useEffect(() => {
    const t = setTimeout(() => {
      setStatus("speaking");
      if (steps.length > 0) {
        setBubbleText(steps[0].teacherPrompt);
        setBubbleTranslation(steps[0].translation);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, [steps]);

  if (!lesson || !unit || !language) return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-display mb-4">🔍</Text>
        <Text className="font-display text-xl text-carbon font-bold mb-2">Lesson data error</Text>
        <Button title="Go Back" onPress={() => router.back()} className="mt-4" />
      </View>
    </SafeAreaView>
  );

  const step = steps[stepIndex];
  const go = (s: SessionStatus, text: string, trans?: string) => {
    setStatus(s); setBubbleText(text); setBubbleTranslation(trans ?? "");
  };

  const handleMic = () => {
    if (isMuted) { Alert.alert("Mic Muted", "Please unmute to respond."); return; }
    if (status === "speaking") go("listening", `Speak now: "${step.phrase}"`, step.translation);
    else if (status === "listening") {
      go("processing", "Processing voice input...");
      setTimeout(() => {
        go("success", "¡Muy bien! That was great! 👏", "Very well! That was great!");
        setSpeakingScore(randScore()); setPronunciationScore(randScore()); setGrammarScore(randScore());
      }, 1500);
    }
  };

  const handleNext = () => {
    if (stepIndex + 1 < steps.length) {
      const next = stepIndex + 1; setStepIndex(next);
      go("speaking", steps[next].teacherPrompt, steps[next].translation);
    } else {
      setStatus("finished"); setLessonStatus(lesson.id, "completed"); setShowCongrats(true);
    }
  };

  const s = status;
  const label = s === "connecting" ? "Connecting..." : s === "listening" ? "Listening..."
    : s === "processing" ? "Analyzing..." : s === "success" ? "Excellent!" : "Live Call";
  const micIcon: keyof typeof Ionicons.glyphMap =
    isMuted ? "mic-off" : s === "listening" ? "pulse" : s === "processing" ? "hourglass"
    : s === "success" ? "checkmark-circle" : "mic";
  const micBg = s === "listening" ? "bg-mint-pop" : s === "processing" ? "bg-sunburst"
    : s === "success" ? "bg-electric-blue" : isMuted ? "bg-ember" : "bg-paper-white";
  const micLbl = isMuted ? "Muted" : s === "listening" ? "Speaking..."
    : s === "processing" ? "Thinking..." : s === "success" ? "Success!" : "Mic";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.paperWhite }}>
      <StatusBar style="dark" />
      <View className="flex-row items-center justify-between px-6 pt-2 pb-4 border-b border-carbon/10">
        <View className="flex-row items-center">
          <TouchableOpacity activeOpacity={0.8} onPress={() => Alert.alert("End Lesson?",
            "Are you sure?", [{ text: "Cancel", style: "cancel" },
            { text: "Yes, Exit", style: "destructive", onPress: () => router.back() }])}
            className="w-10 h-10 rounded-full border border-carbon items-center justify-center mr-3 bg-paper-white">
            <Ionicons name="chevron-back" size={20} color={colors.carbon} />
          </TouchableOpacity>
          <View>
            <Text className="font-display text-carbon text-lg font-bold">AI Teacher</Text>
            <View className="flex-row items-center mt-0.5">
              <View className="w-2 h-2 rounded-full bg-mint-pop mr-1.5" />
              <Text className="font-body text-carbon/50 text-xs font-semibold uppercase tracking-wider">{language.name} • Online</Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-2.5">
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIsCameraOn(!isCameraOn)}
            className={`w-10 h-10 rounded-full border border-carbon items-center justify-center ${pick(isCameraOn, "bg-electric-blue", "bg-paper-white")}`}>
            <Ionicons name={pick(isCameraOn, "videocam", "videocam-off")} size={18} color={pick(isCameraOn, "#fff", colors.carbon)} />
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
              <TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert("Audio Played", `Simulated voice: "${bubbleText}"`)}
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
            <CallControlButton label="Camera" icon={pick(isCameraOn, "videocam", "videocam-off")}
              onPress={() => setIsCameraOn(!isCameraOn)} isActive={isCameraOn} />
            <View className="items-center">
              <TouchableOpacity activeOpacity={0.8} onPress={handleMic}
                onLongPress={() => setIsMuted(!isMuted)}
                disabled={s === "processing" || s === "connecting"}
                className={`w-14 h-14 rounded-full border border-carbon items-center justify-center ${micBg}`}>
                <Ionicons name={micIcon} size={24} color={isMuted || s !== "speaking" ? "#fff" : colors.carbon} />
              </TouchableOpacity>
              <Text className="text-white text-xs font-bold mt-1.5 uppercase font-display tracking-wide">{micLbl}</Text>
            </View>
            <CallControlButton label="Subtitles" icon="language"
              onPress={() => setShowSubtitles(!showSubtitles)} isActive={showSubtitles} />
            <CallControlButton label="End Call" icon="close" onPress={() => Alert.alert("End Lesson?",
              "Are you sure you want to end this AI Teacher session?", [
                { text: "Cancel", style: "cancel" },
                { text: "Yes, Exit", style: "destructive", onPress: () => router.back() },
              ])} isDanger />
          </View>
        </View>
      </View>

      <FeedbackPanel speaking={speakingScore} pronunciation={pronunciationScore} grammar={grammarScore} />

      <View className="px-6 pt-2 pb-6">
        {s === "success" ? (
          <Button title="Next Phrase" onPress={handleNext} className="py-4 bg-carbon"
            rightIcon={<Ionicons name="arrow-forward" size={16} color="#fff" />} />
        ) : s === "speaking" ? (
          <Button title="Respond" onPress={handleMic} className="py-4 bg-electric-blue" textClassName="text-white"
            leftIcon={<Ionicons name="mic" size={16} color="#fff" />} />
        ) : s === "listening" ? (
          <Button title="Tap when finished speaking" onPress={handleMic}
            className="py-4 bg-mint-pop" textClassName="text-carbon" />
        ) : (
          <Button title={s === "processing" ? "Evaluating response..." : "AI Call Connecting..."}
            onPress={() => {}} disabled className="py-4 bg-soft-mist" />
        )}
      </View>

      <Modal visible={showCongrats} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
          <View className="w-[85%] bg-paper-white border border-carbon rounded-[28px] p-6 items-center">
            <Text style={{ fontSize: 64 }} className="mb-4">🎉</Text>
            <Text className="font-display text-carbon text-2xl font-bold text-center mb-2">Lesson Complete!</Text>
            <Text className="font-body text-carbon/60 text-center mb-6">
              You completed the AI Teacher audio session for &ldquo;{lesson.title}&rdquo; and earned {lesson.xpReward} XP!
            </Text>
            <View className="bg-sky-wash border border-carbon rounded-[16px] px-5 py-3 items-center mb-6 w-full">
              <Text className="font-display text-carbon text-sm font-bold">Reward Added</Text>
              <Text className="font-display text-electric-blue text-xl font-extrabold mt-1">+{lesson.xpReward} XP</Text>
            </View>
            <Button title="Continue" onPress={() => { setShowCongrats(false); router.replace("/lesson"); }}
              className="py-4 bg-carbon w-full" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
