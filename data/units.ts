import { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish - Unit 1: Basics
  {
    id: "es-basics-1",
    languageId: "es",
    title: "Basics",
    description: "Greetings, introductions, and essential phrases.",
    order: 1,
    lessonIds: ["es-basics-1-lesson-1", "es-basics-1-lesson-2", "es-basics-1-lesson-3", "es-basics-1-lesson-4"],
    xpReward: 40,
  },
  // Spanish - Unit 2: Food & Drink
  {
    id: "es-food-1",
    languageId: "es",
    title: "Food & Drink",
    description: "Order food, talk about meals, and describe tastes.",
    order: 2,
    lessonIds: ["es-food-1-lesson-1", "es-food-1-lesson-2", "es-food-1-lesson-3", "es-food-1-lesson-4"],
    xpReward: 40,
  },
  // French - Unit 1: Basics
  {
    id: "fr-basics-1",
    languageId: "fr",
    title: "Basics",
    description: "Greetings, introductions, and essential phrases.",
    order: 1,
    lessonIds: ["fr-basics-1-lesson-1", "fr-basics-1-lesson-2", "fr-basics-1-lesson-3", "fr-basics-1-lesson-4"],
    xpReward: 40,
  },
  // German - Unit 1: Basics
  {
    id: "de-basics-1",
    languageId: "de",
    title: "Basics",
    description: "Greetings, introductions, and essential phrases.",
    order: 1,
    lessonIds: ["de-basics-1-lesson-1", "de-basics-1-lesson-2", "de-basics-1-lesson-3", "de-basics-1-lesson-4"],
    xpReward: 40,
  },
  // Italian - Unit 1: Basics
  {
    id: "it-basics-1",
    languageId: "it",
    title: "Basics",
    description: "Greetings, introductions, and essential phrases.",
    order: 1,
    lessonIds: ["it-basics-1-lesson-1", "it-basics-1-lesson-2", "it-basics-1-lesson-3", "it-basics-1-lesson-4"],
    xpReward: 40,
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return units.filter((unit) => unit.languageId === languageId);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
