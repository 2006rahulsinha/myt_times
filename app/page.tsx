"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Lock, Puzzle } from "lucide-react";
import { useProgressStore } from "@/store/progressStore";
import { PUZZLE_ORDER, PUZZLE_NAMES, PuzzleId } from "@/types/puzzle";

const puzzleRoutes: Record<PuzzleId, string> = {
  wordle: "/wordle",
  connections: "/connections",
  strands: "/strands",
  crossword: "/crossword",
  sudoku: "/sudoku",
  unlock: "/unlock",
};

const puzzleDescriptions: Record<PuzzleId, string> = {
  wordle: "Decrypt the five-letter mystery",
  connections: "Find the hidden relationships",
  strands: "Trace the threads of meaning",
  crossword: "Fill in the pieces of the story",
  sudoku: "Complete the final grid",
  unlock: "Reveal your special gift",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "backOut" as const,
    },
  },
};

export default function Home() {
  const { currentStage, isUnlocked } = useProgressStore();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: "backOut",
              }}
              className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 mb-6 shadow-lg"
            >
              <Puzzle className="w-10 h-10 md:w-12 md:h-12 text-accent-foreground" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient">Puzzle Journey</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              A special adventure awaits you. Solve each puzzle to unlock the next
              chapter, leading to something meaningful at the end.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {PUZZLE_ORDER.map((puzzleId, index) => {
                const unlocked = isUnlocked(puzzleId);
                const route = puzzleRoutes[puzzleId];

                return (
                  <motion.div
                    key={puzzleId}
                    variants={cardVariants}
                    whileHover={{ scale: unlocked ? 1.03 : 1 }}
                    whileTap={{ scale: unlocked ? 0.98 : 1 }}
                    className="relative"
                  >
                    <Link
                      href={unlocked ? route : "#"}
                      className={`block rounded-2xl p-5 md:p-6 transition-all transition-all duration-300 ${
                        unlocked
                          ? "bg-card hover:bg-accent/10 border border-border hover:border-accent/50 shadow-lg hover:shadow-accent/20 cursor-pointer glass"
                          : "bg-muted/50 border border-border/50 cursor-not-allowed"
                      }`}
                      onClick={(e) => !unlocked && e.preventDefault()}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 ${
                            unlocked
                              ? "bg-gradient-to-br from-primary-300 to-primary-500 text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {unlocked ? (
                            <span className="text-3xl md:text-3xl font-bold text-accent">
                              {index + 1}
                            </span>
                          ) : (
                            <Lock className="w-4 h-4 md:w-6 md:h-6" />
                          )}
                        </div>

                        <h3
                          className={`text-base md:text-lg font-semibold mb-1 ${
                            unlocked ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {PUZZLE_NAMES[puzzleId]}
                        </h3>

                        <p className="text-xs md:text-sm text-muted-foreground">
                          {puzzleDescriptions[puzzleId]}
                        </p>
                      </div>

                      {!unlocked && index === 0 && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/wordle"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-muted text-yellow-500 font-semibold text-lg shadow-lg hover:text-yellow-400 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-100"
            >
              Begin Your Journey
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-muted-foreground mt-8"
          >
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
