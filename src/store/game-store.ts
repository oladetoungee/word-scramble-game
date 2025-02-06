import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { sessionStorageMiddleware } from "./session-storage"; // Your custom sessionStorage middleware

interface IncorrectAnswer {
  word: string;
  userInput: string;
}

interface GameState {
  score: number;
  questionCount: number;
  gameStarted: boolean;
  hasActiveGame: boolean;
  incorrectAnswers: IncorrectAnswer[];
  startGame: () => void;
  incrementScore: () => void;
  trackIncorrectAnswer: (word: string, userInput: string) => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      score: 0,
      questionCount: 0,
      gameStarted: false,
      hasActiveGame: false,
      incorrectAnswers: [],
      startGame: () => set({ gameStarted: true, hasActiveGame: true }),
      incrementScore: () => set((state) => ({ score: state.score + 10 })),
      trackIncorrectAnswer: (word, userInput) => {
        set((state) => ({
          incorrectAnswers: [...state.incorrectAnswers, { word, userInput }],
        }));
      },
      // Action to increment questionCount (persisted)
      nextQuestion: () =>
        set((state) => ({ questionCount: state.questionCount + 1 })),
      resetGame: () => {
        set({
          score: 0,
          questionCount: 0,
          gameStarted: false,
          hasActiveGame: false,
          incorrectAnswers: [],
        });
      },
    }),
    {
      name: "game-storage",
      storage: sessionStorageMiddleware as PersistStorage<GameState>,
    }
  )
);
