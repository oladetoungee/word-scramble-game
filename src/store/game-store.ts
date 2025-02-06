import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { sessionStorageMiddleware } from "./session-storage"; // Import custom sessionStorage

interface GameState {
  score: number;
  roundIndex: number;
  wordIndex: number;
  gameStarted: boolean;
  incorrectAnswers: { word: string; userInput: string }[];
  incrementScore: () => void;
  trackIncorrectAnswer: (word: string, userInput: string) => void;
  nextWord: () => void;
  nextRound: () => void;
  resetGame: () => void;
  startGame: () => void;
}

interface IncorrectAnswer {
  word: string;
  userInput: string;
}

interface GameState {
  score: number;
  roundIndex: number;
  wordIndex: number;
  gameStarted: boolean;
  hasActiveGame: boolean;
  incorrectAnswers: IncorrectAnswer[];
  startGame: () => void;
  incrementScore: () => void;
  trackIncorrectAnswer: (word: string, userInput: string) => void;
  nextWord: () => void;
  nextRound: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      score: 0,
      roundIndex: 0,
      wordIndex: 0,
      gameStarted: false,
      hasActiveGame: false, // Track if game is in progress
      incorrectAnswers: [], // Track incorrect words

      startGame: () => set({ gameStarted: true, hasActiveGame: true }),

      incrementScore: () => set((state) => ({ score: state.score + 10 })),

      trackIncorrectAnswer: (word, userInput) => {
        set((state) => ({
          incorrectAnswers: [...state.incorrectAnswers, { word, userInput }],
        }));
      },

      nextWord: () => {
        const { wordIndex } = get();
        if (wordIndex < 2) {
          set({ wordIndex: wordIndex + 1 });
        }
      },

      nextRound: () => {
        const { roundIndex } = get();
        if (roundIndex < 2) {
          set({ roundIndex: roundIndex + 1, wordIndex: 0 });
        } else {
          // If all rounds are complete, move to Game Over screen
          set({ gameStarted: false, hasActiveGame: false });
        }
      },

      resetGame: () => {
        set({
          score: 0,
          roundIndex: 0,
          wordIndex: 0,
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
