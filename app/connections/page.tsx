"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PartyPopper, RefreshCw, Shuffle } from "lucide-react";
import { PageWrapper } from "@/components/layout";
import { useProgressStore } from "@/store/progressStore";
import { connectionsData } from "@/data/connections";

interface Word {
  text: string;
  selected: boolean;
  solved: boolean;
  groupIndex: number;
}

const colorStyles: Record<string, { bg: string; text: string; border: string }> = {
  yellow: {
    bg: "bg-yellow-500",
    text: "text-warning-foreground",
    border: "border-warning-400",
  },
  green: {
    bg: "bg-green-500",
    text: "text-success-foreground",
    border: "border-success-400",
  },
  blue: {
    bg: "bg-blue-500",
    text: "text-accent-foreground",
    border: "border-primary-400",
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-accent-foreground",
    border: "border-accent-400",
  },
};

export default function ConnectionsPage() {
  const router = useRouter();
  const { completePuzzle, completedPuzzles, isUnlocked } = useProgressStore();

  const [words, setWords] = useState<Word[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [solvedGroups, setSolvedGroups] = useState<number[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [isReadonly, setIsReadonly] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const allWords = connectionsData.groups.flatMap((group, groupIndex) =>
      group.words.map((word) => ({
        text: word,
        selected: false,
        solved: false,
        groupIndex,
      }))
    );

    setWords(shuffleWords(allWords));
  }, []);

  useEffect(() => {
    if (completedPuzzles.connections) {
      setIsReadonly(true);
      const solvedGroupIndices = connectionsData.groups.map((_, i) => i);
      setSolvedGroups(solvedGroupIndices);
      setGameState("won");
    }
  }, [completedPuzzles.connections]);

  useEffect(() => {
    if (!isUnlocked("connections")) {
      router.push("/");
    }
  }, [isUnlocked, router]);

  const shuffleWords = (wordsArray: Word[]): Word[] => {
    const shuffled = [...wordsArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleShuffle = () => {
    const unsolvedWords = words.filter((w) => !w.solved);
    const solvedWords = words.filter((w) => w.solved);
    const shuffledUnsolved = shuffleWords(unsolvedWords);

    setWords([...solvedWords, ...shuffledUnsolved]);
  };

  const toggleWord = (text: string) => {
    if (isReadonly || gameState !== "playing") return;

    const selectedCount = words.filter((w) => w.selected && !w.solved).length;

    setWords((prev) =>
      prev.map((word) => {
        if (word.text === text && !word.solved) {
          if (word.selected) return { ...word, selected: false };
          if (selectedCount < 4) return { ...word, selected: true };
        }
        return word;
      })
    );
  };

  const handleSubmit = useCallback(() => {
    if (isReadonly || gameState !== "playing") return;

    const selectedWords = words.filter((w) => w.selected && !w.solved);
    if (selectedWords.length !== 4) return;

    const groupIndices = Array.from(new Set(selectedWords.map((w) => w.groupIndex)));

    if (groupIndices.length === 1) {
      const groupIndex = groupIndices[0];
      const group = connectionsData.groups[groupIndex];

      setSolvedGroups((prev) => [...prev, groupIndex]);
      setWords((prev) =>
        prev.map((word) =>
          word.groupIndex === groupIndex
            ? { ...word, solved: true, selected: false }
            : word
        )
      );

      if (solvedGroups.length === 3) {
        setTimeout(() => {
          setGameState("won");
          completePuzzle("connections");
        }, 600);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);

      const countByGroup: Record<number, number> = {};
      selectedWords.forEach((w) => {
        countByGroup[w.groupIndex] = (countByGroup[w.groupIndex] || 0) + 1;
      });

      const maxSameGroup = Math.max(...Object.values(countByGroup));
      if (maxSameGroup === 3) {
        setMistakes((prev) => prev + 1);
        if (mistakes + 1 >= 4) {
          setTimeout(() => setGameState("lost"), 500);
        }
      } else {
        setMistakes((prev) => prev + 1);
        if (mistakes + 1 >= 4) {
          setTimeout(() => setGameState("lost"), 500);
        }
      }
    }
  }, [words, mistakes, solvedGroups.length, gameState, isReadonly, completePuzzle]);

  const deselectAll = () => {
    setWords((prev) =>
      prev.map((word) =>
        word.selected && !word.solved ? { ...word, selected: false } : word
      )
    );
  };

  const selectedCount = words.filter((w) => w.selected && !w.solved).length;
  const canSubmit = selectedCount === 4;

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Connections</h1>
            <p className="text-muted-foreground text-sm">
              Find 4 groups of 4 words that share a connection
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-colors ${
                  i < 4 - mistakes ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="space-y-3 mb-6">
            {solvedGroups.map((groupIndex) => {
              const group = connectionsData.groups[groupIndex];
              const styles = colorStyles[group.color];

              return (
                <motion.div
                  key={groupIndex}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`rounded-xl p-4 ${styles.bg} ${styles.text}`}
                >
                  <div className="font-bold text-lg mb-2">{group.name}</div>
                  <div className="text-sm font-medium">
                    {group.words.sort().join(", ")}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {gameState === "playing" && (
            <>
              <motion.div
                animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-4 gap-2 md:gap-3 mb-6"
              >
                {words
                  .filter((w) => !w.solved)
                  .map((word, index) => (
                    <motion.button
                      key={word.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleWord(word.text)}
                      className={`
                        aspect-square rounded-xl font-semibold
                        transition-all duration-200 text-xs sm:text-sm
                        ${
                          word.selected
                            ? "bg-primary-900  text-red-0 border-2 border-primary-400 shadow-lg"
                            : "bg-card border-2 border-border hover:border-primary-300 hover:shadow"
                        }
                      `}
                    >
                      {word.text}
                    </motion.button>
                  ))}
              </motion.div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                  Shuffle
                </button>

                <button
                  onClick={deselectAll}
                  disabled={selectedCount === 0}
                  className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors disabled:opacity-50"
                >
                  Deselect all
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`
                    px-6 py-2 rounded-lg font-semibold transition-all
                    ${
                      canSubmit
                        ? "bg-accent text-secondary-foreground hover:bg-primary-700"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }
                  `}
                >
                  Submit
                </button>
              </div>
            </>
          )}

          <AnimatePresence>
            {gameState === "won" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
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
                    Excellent! All groups found!
                  </h2>

                  <p className="text-success-600 dark:text-success-400 mb-4">
                    You connected all the threads
                  </p>

                  <Link
                    href="/strands"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-success-500 text-white font-medium hover:bg-success-600 transition-colors"
                  >
                    Continue to Strands
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {gameState === "lost" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="bg-destructive-100 dark:bg-destructive-900/30 border border-destructive-200 dark:border-destructive-800 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-destructive-700 dark:text-destructive-300 mb-2">
                    Out of guesses!
                  </h2>

                  <p className="text-destructive-600 dark:text-destructive-400 mb-4">
                    The connections were hidden well
                  </p>

                  <button
                    onClick={() => {
                      setMistakes(0);
                      setSolvedGroups([]);
                      setGameState("playing");
                      const allWords = connectionsData.groups.flatMap((group, groupIndex) =>
                        group.words.map((word) => ({
                          text: word,
                          selected: false,
                          solved: false,
                          groupIndex,
                        }))
                      );
                      setWords(shuffleWords(allWords));
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

          {isReadonly && gameState !== "won" && (
            <div className="text-center">
              <p className="text-muted-foreground">
                You&apos;ve completed this puzzle!
              </p>
              <Link
                href="/strands"
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
