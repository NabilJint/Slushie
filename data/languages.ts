import { Language } from "@/types/learning";

export const languages: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flagEmoji: "https://flagcdn.com/w320/es.png",
    languageCode: "es",
    description: "The second most spoken native language in the world.",
    totalUnits: 2,
    totalLessons: 8,
    color: "#ff6b6b",
    learners: "28.4M learners",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flagEmoji: "https://flagcdn.com/w320/fr.png",
    languageCode: "fr",
    description: "The language of love, fashion, and diplomacy.",
    totalUnits: 1,
    totalLessons: 4,
    color: "#4da2ff",
    learners: "19.4M learners",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flagEmoji: "https://flagcdn.com/w320/de.png",
    languageCode: "de",
    description: "The most widely spoken native language in Europe.",
    totalUnits: 1,
    totalLessons: 4,
    color: "#ffd731",
    learners: "8.1M learners",
  },
  {
    id: "it",
    name: "Italian",
    nativeName: "Italiano",
    flagEmoji: "https://flagcdn.com/w320/it.png",
    languageCode: "it",
    description: "The language of music, art, and cuisine.",
    totalUnits: 1,
    totalLessons: 4,
    color: "#55db9c",
    learners: "7.4M learners",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flagEmoji: "https://flagcdn.com/w320/jp.png",
    languageCode: "ja",
    description: "A language with three writing systems.",
    totalUnits: 1,
    totalLessons: 4,
    color: "#e9ccff",
    learners: "12.7M learners",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    flagEmoji: "https://flagcdn.com/w320/kr.png",
    languageCode: "ko",
    description: "The official language of South and North Korea.",
    totalUnits: 1,
    totalLessons: 4,
    color: "#55db9c",
    learners: "9.3M learners",
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文",
    flagEmoji: "https://flagcdn.com/w320/cn.png",
    languageCode: "zh",
    description: "The most spoken language in the world.",
    totalUnits: 1,
    totalLessons: 4,
    color: "#fb4903",
    learners: "7.4M learners",
  },
];

export function getLanguageById(id: string): Language | undefined {
  return languages.find((lang) => lang.id === id);
}

export function getLanguages(): Language[] {
  return languages;
}
