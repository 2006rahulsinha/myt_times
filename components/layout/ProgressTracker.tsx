"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PuzzleId, PUZZLE_ORDER, PUZZLE_NAMES } from "@/types/puzzle";
import { useProgressStore } from "@/store/progressStore";

const puzzleRoutes: Record<PuzzleId, string> = {
  wordle: "/wordle",
  connections: "/connections",
  strands: "/strands",
  crossword: "/crossword",
  sudoku: "/sudoku",
  unlock: "/unlock",
};

export function ProgressTracker() {
  const pathname = usePathname();
  const { completedPuzzles, isUnlocked } = useProgressStore();

  return (
    <div className="w-full py-5 px-2 md:px-8">
      <div className="flex items-center justify-center gap-2 md:gap- scrollbar-hide">
        {PUZZLE_ORDER.map((puzzleId, index) => {
          const isCompleted = completedPuzzles[puzzleId];
          const isUnlockedPuzzle = isUnlocked(puzzleId);
          const route = puzzleRoutes[puzzleId];
          const isActive = pathname === route;
          const isLast = index === PUZZLE_ORDER.length - 1;

          return (
            <div key={puzzleId} className="flex items-center justify-center">
              <Link
                href={isUnlockedPuzzle ? route : "#"}
                className={`relative flex flex-col items-center group ${
                  !isUnlockedPuzzle ? "pointer-events-none" : ""
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    opacity: isUnlockedPuzzle ? 1 : 0.4,
                  }}
                  className={`
                    relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                    transition-all duration-300 shadow-lg
                    ${
                      isCompleted
                        ? "bg-green-500 text-success-foreground "
                        : isActive && isUnlockedPuzzle
                        ? "bg-accent text-accent-foreground pulse-glow"
                        : isUnlockedPuzzle
                        ? "bg-accent text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                  ) : isUnlockedPuzzle ? (
                    <span className="text-xs md:text-sm font-bold">
                      {index + 1}
                    </span>
                  ) : (
                    <Lock className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </motion.div>

                <span
                  className={`
                    mt-2 text-[10px] md:text-xs font-medium text-center max-w-[60px] md:max-w-[80px] truncate
                    ${isCompleted ? "text-success-600" : isUnlockedPuzzle ? "text-foreground" : "text-muted-foreground"}
                  `}
                >
                  {PUZZLE_NAMES[puzzleId]}
                </span>
              </Link>

              {!isLast && (
                <div className="flex items-center justify-center px-2 py-11">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isCompleted ? 1 : 0.3,
                  }}
                  className={`flex w-6 md:w-12 h-1 mx-1 md:mx-2 rounded-full bg-border items-center justify-center`}
                />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
