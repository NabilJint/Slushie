import { useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { useUser } from "@clerk/expo";
import {
  CallingState,
  StreamVideoClient,
  type Call,
  type User as StreamUser,
} from "@stream-io/video-react-native-sdk";
import { getLanguageById } from "@/data/languages";
import { getLessonById } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLessonStore } from "@/store/use-lesson-store";

export interface AudioStep {
  phrase: string;
  translation: string;
  instruction: string;
  teacherPrompt: string;
}

const SCORES = ["Excellent", "Great", "Good"] as const;
type Score = (typeof SCORES)[number];
type SessionStatus =
  | "connecting"
  | "speaking"
  | "listening"
  | "processing"
  | "success"
  | "finished";

const randScore = (): Score =>
  SCORES[Math.floor(Math.random() * SCORES.length)];

const buildSteps = (lesson: { title: string; description: string; activities: { type: string; instruction: string; items?: { word: string; translation: string }[]; expectedResponse?: string; prompt?: string; agentPrompt?: string; text?: string; translation?: string }[] }): AudioStep[] => {
  const r: AudioStep[] = [];
  for (const act of lesson.activities) {
    if (act.type === "vocabulary-intro" && act.items) {
      for (const item of act.items) {
        r.push({
          phrase: item.word,
          translation: item.translation,
          instruction: "Listen and repeat the vocabulary",
          teacherPrompt: `Repeat after me: "${item.word}"`,
        });
      }
    } else if (act.type === "speak" && act.expectedResponse) {
      r.push({
        phrase: act.expectedResponse,
        translation: act.instruction || act.prompt || "",
        instruction: act.instruction,
        teacherPrompt: act.agentPrompt || `Can you say "${act.expectedResponse}"?`,
      });
    } else if (act.type === "listen-repeat" && act.text) {
      r.push({
        phrase: act.text,
        translation: act.translation || "",
        instruction: act.instruction,
        teacherPrompt: `Let's practice: "${act.text}"`,
      });
    }
  }
  if (r.length === 0) {
    r.push({
      phrase: lesson.title,
      translation: lesson.description,
      instruction: "Practice lesson theme",
      teacherPrompt: `Welcome to the lesson: "${lesson.title}". Say it back.`,
    });
  }
  return r;
};

export function useAudioSession(id: string) {
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
  const [speakingScore, setSpeakingScore] = useState<Score>("Excellent");
  const [pronunciationScore, setPronunciationScore] = useState<Score>("Great");
  const [grammarScore, setGrammarScore] = useState<Score>("Good");
  const [showCongrats, setShowCongrats] = useState(false);

  const { user: clerkUser } = useUser();
  const clerkUserId = clerkUser?.id;
  const clerkUserName = clerkUser?.fullName || clerkUser?.id;
  const [streamClient, setStreamClient] = useState<StreamVideoClient>();
  const [streamCall, setStreamCall] = useState<Call>();
  const [streamConnectionState, setStreamConnectionState] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const streamRef = useRef<{ client: StreamVideoClient; call: Call } | null>(null);

  useEffect(() => {
    if (!clerkUserId) return;

    let cancelled = false;

    const initStream = async () => {
      try {
        const res = await fetch("/api/stream/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: clerkUserId,
            userName: clerkUserName,
          }),
        });

        if (!res.ok) throw new Error("Failed to create Stream session");

        const session = await res.json();
        if (cancelled) return;

        const streamUser: StreamUser = { id: session.userId, name: session.userName };
        const client = StreamVideoClient.getOrCreateInstance({
          apiKey: session.apiKey,
          user: streamUser,
          token: session.token,
        });
        setStreamClient(client);

        const call = client.call(session.callType, session.callId, { reuseInstance: true });
        setStreamCall(call);
        streamRef.current = { client, call };

        setStreamConnectionState("connecting");
        await call.join({ create: true });
        if (!cancelled) {
          setStreamConnectionState("connected");
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Stream init failed", err);
          setStreamConnectionState("error");
        }
      }
    };

    initStream();

    return () => {
      cancelled = true;
      const ref = streamRef.current;
      if (ref) {
        if (ref.call.state.callingState !== CallingState.LEFT) {
          ref.call.leave().catch(() => {});
        }
        ref.client.disconnectUser(5000).catch(() => {});
        streamRef.current = null;
      }
      setStreamClient(undefined);
      setStreamCall(undefined);
      setStreamConnectionState("idle");
    };
  }, [clerkUserId, clerkUserName]);

  useEffect(() => {
    if (!streamCall) return;
    if (isMuted) {
      streamCall.microphone.disable().catch(() => {});
    } else {
      streamCall.microphone.enable().catch(() => {});
    }
  }, [isMuted, streamCall]);

  const steps = useMemo(() => {
    if (!lesson) return [];
    return buildSteps(lesson);
  }, [lesson]);

  const step = steps[stepIndex] ?? steps[0];

  const go = (s: SessionStatus, text: string, trans?: string) => {
    setStatus(s);
    setBubbleText(text);
    setBubbleTranslation(trans ?? "");
  };

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

  const handleMic = () => {
    if (isMuted) {
      Alert.alert("Mic Muted", "Please unmute to respond.");
      return;
    }
    if (status === "speaking") {
      go("listening", `Speak now: "${step.phrase}"`, step.translation);
    } else if (status === "listening") {
      go("processing", "Processing voice input...");
      setTimeout(() => {
        go("success", "¡Muy bien! That was great! 👏", "Very well! That was great!");
        setSpeakingScore(randScore());
        setPronunciationScore(randScore());
        setGrammarScore(randScore());
      }, 1500);
    }
  };

  const handleNext = () => {
    if (stepIndex + 1 < steps.length) {
      const next = stepIndex + 1;
      setStepIndex(next);
      go("speaking", steps[next].teacherPrompt, steps[next].translation);
    } else {
      setStatus("finished");
      setLessonStatus(lesson?.id ?? "", "completed");
      setShowCongrats(true);
    }
  };

  const s = status;
  const label =
    s === "connecting" ? "Connecting..."
    : s === "listening" ? "Listening..."
    : s === "processing" ? "Analyzing..."
    : s === "success" ? "Excellent!"
    : "Live Call";

  const micIcon =
    isMuted ? "mic-off"
    : s === "listening" ? "pulse"
    : s === "processing" ? "hourglass"
    : s === "success" ? "checkmark-circle"
    : "mic";

  const micBg =
    s === "listening" ? "bg-mint-pop"
    : s === "processing" ? "bg-sunburst"
    : s === "success" ? "bg-electric-blue"
    : isMuted ? "bg-ember"
    : "bg-paper-white";

  const micLbl =
    isMuted ? "Muted"
    : s === "listening" ? "Speaking..."
    : s === "processing" ? "Thinking..."
    : s === "success" ? "Success!"
    : "Mic";

  const micDisabled = s === "processing" || s === "connecting";

  return {
    lesson,
    unit,
    language,
    isMuted,
    setIsMuted,
    isCameraOn,
    setIsCameraOn,
    showSubtitles,
    setShowSubtitles,
    status,
    stepIndex,
    bubbleText,
    bubbleTranslation,
    speakingScore,
    pronunciationScore,
    grammarScore,
    showCongrats,
    setShowCongrats,
    steps,
    step,
    label,
    micIcon: micIcon as "mic-off" | "pulse" | "hourglass" | "checkmark-circle" | "mic",
    micBg,
    micLbl,
    micDisabled,
    handleMic,
    handleNext,
    setLessonStatus,
    streamClient,
    streamCall,
    streamConnectionState,
    clerkUser,
  };
}
