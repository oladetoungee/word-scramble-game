"use client";

import { useGameStore } from "@/store/game-store";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const GameOverScreen = () => {
    const { score, resetGame } = useGameStore();
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  px-6 text-center">
            {/* Game Over Title */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-5xl font-extrabold text-chart-1"
            >
                Game Over 🎉
            </motion.h1>

            {/* Score Display */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 text-lg font-bold"
            >
                Your final score: <span className="text-chart-1">{score}/90</span>
            </motion.p>

            {/* Restart Button */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
                <Button
                    variant="secondary"
                    className="px-8 py-3 mt-6 text-lg font-bold shadow-lg transition-all duration-300"
                    onClick={() => {
                        resetGame();
                        router.push("/"); // Navigate to home page
                    }}
                >
                    Go Home 🏠
                </Button>
            </motion.div>
        </div>
    );
};
