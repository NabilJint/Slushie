export type ActivityType =
  | "vocabulary-intro"
  | "multiple-choice"
  | "translate"
  | "fill-blank"
  | "match-pairs"
  | "listen-repeat"
  | "speak"
  | "chat";

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation?: string;
  image?: string;
  audioPrompt?: string;
}

export interface PhraseItem {
  id: string;
  phrase: string;
  translation: string;
  pronunciation?: string;
  vocabularyIds: string[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface ActivityBase {
  id: string;
  type: ActivityType;
  instruction: string;
}

export interface VocabularyIntroActivity extends ActivityBase {
  type: "vocabulary-intro";
  items: VocabularyItem[];
}

export interface MultipleChoiceActivity extends ActivityBase {
  type: "multiple-choice";
  prompt: string;
  options: ChoiceOption[];
  correctIndex: number;
}

export interface TranslateActivity extends ActivityBase {
  type: "translate";
  sourceText: string;
  targetLanguage: string;
  correctAnswer: string;
  acceptableAnswers: string[];
}

export interface FillBlankActivity extends ActivityBase {
  type: "fill-blank";
  sentenceTemplate: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  hint?: string;
}

export interface MatchPairsActivity extends ActivityBase {
  type: "match-pairs";
  pairs: MatchPair[];
}

export interface ListenRepeatActivity extends ActivityBase {
  type: "listen-repeat";
  text: string;
  translation: string;
  audioPrompt?: string;
}

export interface SpeakActivity extends ActivityBase {
  type: "speak";
  prompt: string;
  expectedResponse: string;
  acceptableResponses: string[];
  agentPrompt: string;
}

export interface ChatActivity extends ActivityBase {
  type: "chat";
  scenario: string;
  agentPrompt: string;
  expectedTopics: string[];
}

export type Activity =
  | VocabularyIntroActivity
  | MultipleChoiceActivity
  | TranslateActivity
  | FillBlankActivity
  | MatchPairsActivity
  | ListenRepeatActivity
  | SpeakActivity
  | ChatActivity;

export interface LessonGoal {
  id: string;
  description: string;
  vocabularyIds: string[];
}

export interface AITeacherPrompt {
  contextPrompt: string;
  voiceStyle: string;
  visualCues: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  goals: LessonGoal[];
  activities: Activity[];
  aiTeacherPrompt?: AITeacherPrompt;
  xpReward: number;
  estimatedMinutes: number;
}

export interface Unit {
  id: string;
  languageId: string;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
  xpReward: number;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flagEmoji: string;
  languageCode: string;
  description: string;
  totalUnits: number;
  totalLessons: number;
  color: string;
  learners?: string;
}
