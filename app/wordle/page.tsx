"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Delete, CornerDownLeft, PartyPopper, RefreshCw } from "lucide-react";
import { PageWrapper } from "@/components/layout";
import { useProgressStore } from "@/store/progressStore";
import { wordleData } from "@/data/wordle";

type LetterStatus = "correct" | "present" | "absent" | "empty" | "pending";

interface Tile {
  letter: string;
  status: LetterStatus;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
];

function getStatusColor(status: LetterStatus): string {
  switch (status) {
    case "correct":
      return "bg-green-500 text-success-foreground border-success-500";
    case "present":
      return "bg-warning-500 text-warning-foreground border-warning-500";
    case "absent":
      return "bg-muted text-muted-foreground border-muted";
    case "pending":
      return "bg-card border-border animate-pulse";
    default:
      return "bg-card border-border";
  }
}

function getKeyStatus(
  guesses: Tile[][],
  letter: string
): LetterStatus {
  let hasCorrect = false;
  let hasPresent = false;
  let hasAbsent = false;

  for (const row of guesses) {
    for (const tile of row) {
      if (tile.letter === letter) {
        if (tile.status === "correct") hasCorrect = true;
        else if (tile.status === "present") hasPresent = true;
        else if (tile.status === "absent") hasAbsent = true;
      }
    }
  }

  if (hasCorrect) return "correct";
  if (hasPresent) return "present";
  if (hasAbsent) return "absent";
  return "empty";
}

export default function WordlePage() {
  const router = useRouter();
  const { completePuzzle, completedPuzzles, isUnlocked } = useProgressStore();
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<Tile[][]>(() =>
    Array(6).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ letter: "", status: "empty" as LetterStatus }))
    )
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [shakeRow, setShakeRow] = useState<number | null>(null);
  const [isReadonly, setIsReadonly] = useState(false);

  const answer = wordleData.answer.toUpperCase();

  useEffect(() => {
    if (completedPuzzles.wordle) {
      setIsReadonly(true);
    }
  }, [completedPuzzles.wordle]);

  useEffect(() => {
    if (!isUnlocked("wordle")) {
      router.push("/");
    }
  }, [isUnlocked, router]);

  const evaluateGuess = useCallback((guess: string): Tile[] => {
    const result: Tile[] = guess.split("").map((letter, i) => ({
      letter,
      status: "pending" as LetterStatus,
    }));

    const answerLetters = answer.split("");
    const usedIndices = new Set<number>();

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === answer[i]) {
        result[i].status = "correct";
        usedIndices.add(i);
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (result[i].status === "correct") continue;

      const letterIndex = answerLetters.findIndex(
        (l, idx) => l === guess[i] && !usedIndices.has(idx)
      );

      if (letterIndex !== -1) {
        result[i].status = "present";
        usedIndices.add(letterIndex);
      } else {
        result[i].status = "absent";
      }
    }

    return result;
  }, [answer]);

  const handleSubmit = useCallback(() => {
    if (isReadonly || currentGuess.length !== 5 || gameState !== "playing") return;

    if (!wordleData.validGuesses.includes(currentGuess.toUpperCase())) {
      setShakeRow(currentRow);
      setTimeout(() => setShakeRow(null), 500);
      return;
    }

    const evaluated = evaluateGuess(currentGuess.toUpperCase());
    const newGuesses = [...guesses];
    newGuesses[currentRow] = evaluated;
    setGuesses(newGuesses);

    if (currentGuess.toUpperCase() === answer) {
      setTimeout(() => {
        setGameState("won");
        completePuzzle("wordle");
      }, 1600);
    } else if (currentRow === 5) {
      setTimeout(() => {
        setGameState("lost");
      }, 1600);
    } else {
      setCurrentRow(currentRow + 1);
      setCurrentGuess("");
    }
  }, [
    currentGuess,
    guesses,
    currentRow,
    answer,
    gameState,
    isReadonly,
    completePuzzle,
    evaluateGuess,
  ]);

  const handleKeyPress = useCallback((key: string) => {
    if (isReadonly || gameState !== "playing") return;

    if (key === "ENTER") {
      handleSubmit();
      return;
    }

    if (key === "DELETE" || key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  }, [currentGuess, gameState, handleSubmit, isReadonly]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key === "BACKSPACE" ? "DELETE" : key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Wordle</h1>
            <p className="text-muted-foreground text-sm">
              Guess the 5-letter word in 6 tries
            </p>
          </div>

          <div className="grid gap-2 mb-6">
            {guesses.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="grid grid-cols-5 gap-2"
                animate={shakeRow === rowIndex ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                {row.map((tile, tileIndex) => {
                  const isActive = rowIndex === currentRow;
                  const currentLetter = isActive
                    ? currentGuess[tileIndex] || ""
                    : tile.letter;
                  const showStatus = rowIndex < currentRow ||
                    (rowIndex === currentRow && gameState !== "playing");

                  return (
                    <motion.div
                      key={tileIndex}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center
                        font-bold text-xl md:text-2xl uppercase
                        border-2 transition-colors duration-300
                        ${
                          currentLetter
                            ? showStatus
                              ? getStatusColor(tile.status)
                              : "bg-card border-border"
                            : "bg-primary-50/50 dark:bg-primary-900/10 border-border"
                        }
                      `}
                      style={{
                        animationDelay: showStatus
                          ? `${tileIndex * 100}ms`
                          : "0ms",
                      }}
                    >
                      {currentLetter && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        >
                          {currentLetter}
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {gameState === "won" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center mb-6"
              >
                <motion.div
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="bg-success-100 dark:bg-success-900/30 border border-success-200 dark:border-success-800 rounded-xl p-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                    className="inline-block mb-3"
                  >
                    <PartyPopper className="w-12 h-12 text-success-500" />
                  </motion.div>

                  <h2 className="text-xl font-bold text-success-700 dark:text-success-300 mb-2">
                    Brilliant! You got it!
                  </h2>

                  <p className="text-success-600 dark:text-success-400 mb-4">
                    The word was <strong>{answer}</strong>
                  </p>

                  <Link
                    href="/connections"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-success-500 text-white font-medium hover:bg-success-600 transition-colors"
                  >
                    Continue to Connections
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {gameState === "lost" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center mb-6"
              >
                <div className="bg-destructive-100 dark:bg-destructive-900/30 border border-destructive-200 dark:border-destructive-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-destructive-700 dark:text-destructive-300 mb-2">
                    Good try!
                  </h2>

                  <p className="text-destructive-600 dark:text-destructive-400 mb-4">
                    The word was <strong>{answer}</strong>
                  </p>

                  <button
                    onClick={() => {
                      setCurrentGuess("");
                      setGuesses(
                        Array(6).fill(null).map(() =>
                          Array(5).fill(null).map(() => ({
                            letter: "",
                            status: "empty" as LetterStatus,
                          }))
                        )
                      );
                      setCurrentRow(0);
                      setGameState("playing");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-primary-foreground font-medium hover:bg-primary-600 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {gameState === "playing" && !isReadonly && (
            <div className="space-y-2">
              {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1 md:gap-1.5">
                  {row.map((key) => {
                    const keyStatus = getKeyStatus(guesses, key);
                    const isSpecial = key === "ENTER" || key === "DELETE";

                    return (
                      <motion.button
                        key={key}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleKeyPress(key)}
                        className={`
                          rounded font-semibold uppercase transition-all
                          ${
                            isSpecial
                              ? "px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm"
                              : "w-7 md:w-10 h-10 md:h-12 text-xs md:text-sm"
                          }
                          ${getStatusColor(keyStatus)}
                          hover:brightness-110 active:brightness-90
                        `}
                      >
                        {key === "DELETE" ? (
                          <Delete className="w-4 h-4 md:w-5 md:h-5" />
                        ) : key === "ENTER" ? (
                          <CornerDownLeft className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          key
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {isReadonly && (
            <div className="text-center">
              <p className="text-muted-foreground">
                You&apos;ve completed this puzzle!
              </p>
              <Link
                href="/connections"
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg bg-primary-500 text-primary-foreground font-medium hover:bg-primary-600 transition-colors"
              >
                Continue
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
