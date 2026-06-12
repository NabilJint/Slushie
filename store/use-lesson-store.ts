import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type LessonStatus = "completed" | "in_progress" | "locked";

interface LessonState {
  lessonStatuses: Record<string, LessonStatus>;
  setLessonStatus: (lessonId: string, status: LessonStatus) => void;
  getLessonStatus: (lessonId: string) => LessonStatus;
}

export const useLessonStore = create<LessonState>()(
  persist(
    (set, get) => ({
      lessonStatuses: {
        "es-basics-1-lesson-1": "completed",
        "es-basics-1-lesson-2": "completed",
        "es-basics-1-lesson-3": "in_progress",
      },
      setLessonStatus: (lessonId, status) =>
        set((state) => ({
          lessonStatuses: { ...state.lessonStatuses, [lessonId]: status },
        })),
      getLessonStatus: (lessonId) => {
        return get().lessonStatuses[lessonId] ?? "locked";
      },
    }),
    {
      name: "lesson-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
