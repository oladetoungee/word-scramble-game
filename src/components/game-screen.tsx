// GameScreen.tsx
"use client";

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SkeletonCard } from "@/components";
import { useGameLogic, ScrambledLetter } from "@/hooks/use-game-logic";

export const GameScreen = () => {
    const {
        loading,
        scrambled,
        selectedLetters,
        timeLeft,
        feedback,
        showConfetti,
        currentWordObj,
        roundIndex,
        score,
        roundHints,
        questionCount,
        totalQuestions,
        handleLetterClick,
        checkAnswer,
        handleNextWord,

    } = useGameLogic();

    if (loading) return <SkeletonCard />;

    return (
        <div className=" flex flex-col items-center justify-center min-h-screen bg-accent-foreground  px-4 sm:px-6">

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <Card className=" w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 sm:p-6 bg-gray-800 shadow-xl rounded-2xl">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-4 gap-6">
                        <h2 className="text-sm font-bold text-chart-1">
                            Round {roundIndex + 1} - {roundHints[roundIndex]}
                        </h2>
                        <h2 className="text-sm font-bold text-chart-1">Score: {score}/90</h2>
                        <h2 className={`text-sm font-bold ${timeLeft <= 10 ? "text-destructive" : "text-chart-4"}`}>
                            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                        </h2>
                    </div>
                    {/* Scrambled Letters */}
                    <div className="w-full text-center p-4 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold tracking-widest text-chart-1">
                            {scrambled.map((letterObj: ScrambledLetter) => (
                                <motion.span
                                    key={letterObj.id}
                                    whileHover={{ scale: 1.2 }}
                                    className={`inline-block mx-1 p-3 rounded-lg shadow-md text-2xl cursor-pointer ${selectedLetters.some((l) => l.id === letterObj.id) ? "opacity-50" : "bg-gray-700 text-white"
                                        }`}
                                    onClick={() => handleLetterClick(letterObj)}
                                >
                                    {letterObj.letter}
                                </motion.span>
                            ))}
                        </h3>
                        <p className="text-gray-400 mt-2">Hint: {currentWordObj?.hint}</p>
                    </div>
                    <div className="relative mt-6">
                        {showConfetti && (
                            <div className="absolute inset-0 pointer-events-none">
                                <Confetti />
                            </div>
                        )}
                        <h3 className="text-lg font-semibold text-chart-1 mb-2 text-center">Your Answer</h3>
                        <div className="flex flex-wrap justify-center gap-3 p-4 bg-gray-700 rounded-lg shadow-md">
                            {selectedLetters.length > 0 ? (
                                selectedLetters.map((letterObj: ScrambledLetter) => (
                                    <motion.button
                                        key={letterObj.id}
                                        whileTap={{ scale: 0.9 }}
                                        className="px-2 py-2 text-sm font-semibold bg-chart-1 text-black rounded-lg shadow-md hover:bg-chart-4"
                                        onClick={() => handleLetterClick(letterObj)}
                                    >
                                        {letterObj.letter}
                                    </motion.button>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm italic">No letters selected</p>
                            )}
                        </div>
                    </div>

                    {feedback && (
                        <motion.p
                            key={feedback}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`mt-4 text-lg font-semibold ${feedback.includes("✅") ? "text-green-400" : "text-red-400"}`}
                        >
                            {feedback}
                        </motion.p>
                    )}

                    {/* Controls */}
                    <div className="mt-4 flex flex-col sm:flex-row justify-between gap-3">
                        <Button
                            variant="secondary"
                            onClick={checkAnswer}
                            disabled={selectedLetters.length !== (currentWordObj ? currentWordObj.word.length : 0)}
                        >
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleNextWord} disabled={feedback && !feedback.includes("✅") || false}>
                            Next Word
                        </Button>
                    </div>

                    {/* Overall Progress */}
                    <div className="mt-6">
                        <p className="text-sm text-gray-300">
                            Questions: {questionCount} / {totalQuestions}
                        </p>
                        <Progress value={(questionCount / totalQuestions) * 100} />
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
