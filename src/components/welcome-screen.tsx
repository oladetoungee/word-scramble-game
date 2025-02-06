"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-6 text-center space-y-12">
      {/* Game Intro */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl font-extrabold text-chart-1"
      >
        Word Scramble Challenge 🔠
      </motion.h1>
      {/* Game Rules */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="text-lg max-w-xl leading-relaxed"
      >
        Unscramble the words to win! The game consists of <span className="font-bold text-chart-1">3 rounds</span>, each with increasing difficulty.
        There are a total of <span className="font-bold text-chart-1">9 words</span>, with 3 words per round.
        You have 30 seconds per word. You can skip to the next but can't go back.
        Use hints wisely. <span className="font-bold text-chart-1">Can you beat the game?</span>
      </motion.p>
      {/* Start Game Button */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.2, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      >
        <Button
          variant="secondary"
          className="px-8 py-3 text-lg font-bold shadow-lg transition-all duration-300"
          onClick={() => router.push("/game")}
        >
          Start Game 🚀
        </Button>
      </motion.div>
    </div>
  );
}