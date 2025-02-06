
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSound from "use-sound";
import { useGameStore } from "@/store/game-store";
import { rounds, WordEntry } from "@/data/word-list";

// Sound effect paths
const CLICK_SOUND = "/sounds/click.mp3";
const CORRECT_SOUND = "/sounds/correct.mp3";
const ERROR_SOUND = "/sounds/error.mp3";
const TICK_SOUND = "/sounds/tick.mp3";

// Each letter is represented with a unique id to handle duplicates.
export type ScrambledLetter = {
  id: number;
  letter: string;
};

// Scramble a word and return an array of ScrambledLetter objects.
export const scrambleWord = (word: string): ScrambledLetter[] => {
  const letters = word.split("");
  let scrambled = letters.map((letter, idx) => ({ id: idx, letter }));
  do {
    scrambled = scrambled.sort(() => Math.random() - 0.5);
  } while (scrambled.map((l) => l.letter).join("") === word);
  return scrambled;
};

// Round hints for display
const ROUND_HINTS = ["Easy", "Medium", "Hard"];

export const useGameLogic = () => {
  const router = useRouter();
  const { score, incrementScore } = useGameStore();

  // Game settings
  const TOTAL_QUESTIONS = 9;
  const WORDS_PER_ROUND = 3;

  // State for game progression
  const [questionCount, setQuestionCount] = useState<number>(0);
  const roundIndex = Math.floor(questionCount / WORDS_PER_ROUND);

  // Word-related state
  const [currentWordObj, setCurrentWordObj] = useState<WordEntry | null>(null);
  const [scrambled, setScrambled] = useState<ScrambledLetter[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<ScrambledLetter[]>([]);

  // Timer and UI state
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [paused, setPaused] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load sound effects
  const [playClick] = useSound(CLICK_SOUND, { volume: 0.5 });
  const [playCorrect] = useSound(CORRECT_SOUND, { volume: 0.6 });
  const [playError] = useSound(ERROR_SOUND, { volume: 0.6 });
  const [playTick] = useSound(TICK_SOUND, { volume: 0.4 });

  // Get the current round from our word list.
  const currentRound = rounds[roundIndex];

  // Select a random word from the current round.
  const selectRandomWord = (): WordEntry =>
    currentRound.words[Math.floor(Math.random() * currentRound.words.length)];

  // Update the current word when the questionCount or round changes.
  useEffect(() => {
    if (questionCount < TOTAL_QUESTIONS) {
      const wordObj = selectRandomWord();
      setCurrentWordObj(wordObj);
      setScrambled(scrambleWord(wordObj.word));
      setSelectedLetters([]);
      setTimeLeft(30);
      setFeedback(null);
      setShowConfetti(false);
    }
  }, [questionCount, roundIndex]);

  // Simulate loading transition on mount.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Timer countdown logic.
  useEffect(() => {
    if (timeLeft > 0 && !paused) {
      if (timeLeft === 10) playTick();
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentWordObj) {
      playError();
      setFeedback(`⏳ Time's up! The correct word was: ${currentWordObj.word}`);
      setTimeout(() => handleNextWord(), 2000);
    }
  }, [timeLeft, paused, playTick, playError, currentWordObj]);

  // Toggle letter selection by unique id.
  const handleLetterClick = (letterObj: ScrambledLetter) => {
    playClick();
    setSelectedLetters((prev) =>
      prev.some((l) => l.id === letterObj.id)
        ? prev.filter((l) => l.id !== letterObj.id)
        : [...prev, letterObj]
    );
  };

  // Validate the answer and update game state.
  const checkAnswer = () => {
    if (!currentWordObj) return;
    const answer = selectedLetters.map((l) => l.letter).join("");
    if (answer === currentWordObj.word) {
      playCorrect();
      setFeedback("✅ Correct!");
      incrementScore();
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        handleNextWord();
      }, 1500);
    } else {
      playError();
      setFeedback("❌ Incorrect! Try again.");
      setTimeout(() => {
        setSelectedLetters([]);
        setFeedback(null);
      }, 1000);
    }
  };

  // Proceed to the next question or end the game.
  const handleNextWord = () => {
    const newCount = questionCount + 1;
    if (newCount >= TOTAL_QUESTIONS) {
      router.push("/game-over");
    } else {
      setQuestionCount(newCount);
    }
  };

  const togglePause = () => setPaused((prev) => !prev);

  return {
    loading,
    scrambled,
    selectedLetters,
    timeLeft,
    paused,
    feedback,
    showConfetti,
    currentWordObj,
    currentWord: currentWordObj?.word || "",
    roundIndex,
    score,
    roundHints: ROUND_HINTS,
    questionCount,
    totalQuestions: TOTAL_QUESTIONS,
    handleLetterClick,
    checkAnswer,
    handleNextWord,
    togglePause,
  };
};
