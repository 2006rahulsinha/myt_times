"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PartyPopper, Lightbulb, Sparkles } from "lucide-react";
import { PageWrapper } from "@/components/layout";
import { useProgressStore } from "@/store/progressStore";
import { strandsData } from "@/data/strands";

interface Cell {
  row: number;
  col: number;
  letter: string;
}

interface FoundWord {
  word: string;
  cells: Cell[];
  isSpangram: boolean;
}

const GRID_ROWS = 7;
const GRID_COLS = 8;

export default function StrandsPage() {
  const router = useRouter();
  const { completePuzzle, completedPuzzles, isUnlocked } = useProgressStore();

  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "won">("playing");
  const [isReadonly, setIsReadonly] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (completedPuzzles.strands) {
      setIsReadonly(true);
      const allWords = strandsData.answers.map((word) => ({
        word,
        cells: [],
        isSpangram: word === strandsData.spangram,
      }));
      setFoundWords(allWords);
      setGameState("won");
    }
  }, [completedPuzzles.strands]);

  useEffect(() => {
    if (!isUnlocked("strands")) {
      router.push("/");
    }
  }, [isUnlocked, router]);

  const isAdjacent = (a: Cell, b: Cell): boolean => {
    const rowDiff = Math.abs(a.row - b.row);
    const colDiff = Math.abs(a.col - b.col);
    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
  };

  const handleStart = (row: number, col: number) => {
    if (isReadonly || gameState !== "playing") return;

    const cell = { row, col, letter: strandsData.grid[row][col]! };
    setSelectedCells([cell]);
    setIsSelecting(true);
  };

  const handleMove = (row: number, col: number) => {
    if (!isSelecting || isReadonly || gameState !== "playing") return;

    const cell = { row, col, letter: strandsData.grid[row][col]! };

    const lastSelected = selectedCells[selectedCells.length - 1];
    if (lastSelected.row === row && lastSelected.col === col) return;

    const alreadySelected = selectedCells.find(
      (c) => c.row === row && c.col === col
    );

    if (alreadySelected) {
      const index = selectedCells.findIndex(
        (c) => c.row === row && c.col === col
      );
      setSelectedCells(selectedCells.slice(0, index + 1));
      return;
    }

    if (!isAdjacent(lastSelected, cell)) return;

    setSelectedCells([...selectedCells, cell]);
  };

  const handleEnd = useCallback(() => {
    if (!isSelecting || selectedCells.length < 3) {
      setIsSelecting(false);
      setSelectedCells([]);
      return;
    }

    const word = selectedCells.map((c) => c.letter).join("");

    const normalizedWord = word.toUpperCase();
    const reversedWord = word.split("").reverse().join("").toUpperCase();

    const isMatch = strandsData.answers.some(
      (a) => a.toUpperCase() === normalizedWord || a.toUpperCase() === reversedWord
    );

    const matchedWord = strandsData.answers.find(
      (a) => a.toUpperCase() === normalizedWord || a.toUpperCase() === reversedWord
    );

    if (isMatch && matchedWord) {
      const alreadyFound = foundWords.find(
        (fw) => fw.word.toUpperCase() === matchedWord.toUpperCase()
      );

      if (!alreadyFound) {
        const isSpangram = matchedWord.toUpperCase() === strandsData.spangram.toUpperCase();
        const newFound: FoundWord = {
          word: matchedWord,
          cells: [...selectedCells],
          isSpangram,
        };

        const newFoundWords = [...foundWords, newFound];
        setFoundWords(newFoundWords);

        if (newFoundWords.length === strandsData.answers.length) {
          setTimeout(() => {
            setGameState("won");
            completePuzzle("strands");
          }, 500);
        }
      }
    }

    setIsSelecting(false);
    setSelectedCells([]);
  }, [isSelecting, selectedCells, foundWords, completePuzzle]);

  const isCellFound = (row: number, col: number): boolean => {
    return foundWords.some((fw) =>
      fw.cells.some((c) => c.row === row && c.col === col)
    );
  };

  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some((c) => c.row === row && c.col === col);
  };

  const getFoundWordForCell = (row: number, col: number): FoundWord | null => {
    return (
      foundWords.find((fw) =>
        fw.cells.some((c) => c.row === row && c.col === col)
      ) || null
    );
  };

  const handleHint = () => {
    if (isReadonly || gameState !== "playing" || hintsUsed >= 3) return;

    const unfoundWords = strandsData.answers.filter(
      (a) =>
        !foundWords.find((fw) => fw.word.toUpperCase() === a.toUpperCase())
    );

    if (unfoundWords.length === 0) return;

    const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
    const firstLetterIndex = strandsData.grid.flat().indexOf(randomWord[0]);

    if (firstLetterIndex !== -1) {
      const row = Math.floor(firstLetterIndex / GRID_COLS);
      const col = firstLetterIndex % GRID_COLS;

      const cell = { row, col, letter: strandsData.grid[row][col]! };
      setSelectedCells([cell]);
      setTimeout(() => setSelectedCells([]), 1000);
    }

    setHintsUsed(hintsUsed + 1);
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-lg mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Strands</h1>
            <p className="text-muted-foreground text-sm mb-2">
              Drag to spell words related to the theme
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="font-semibold text-primary-700 dark:text-primary-300">
                {strandsData.themeClue}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4 px-2">
            <div className="text-sm text-muted-foreground">
              Found: {foundWords.length} / {strandsData.answers.length}
            </div>
            <button
              onClick={handleHint}
              disabled={hintsUsed >= 3}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 text-sm disabled:opacity-50 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Hint ({3 - hintsUsed} left)
            </button>
          </div>

          <div
            ref={gridRef}
            className="relative touch-none select-none"
            onMouseDown={(e) => {
              e.preventDefault();
              const target = e.target as HTMLElement;
              const row = parseInt(target.dataset.row || "");
              const col = parseInt(target.dataset.col || "");
              if (!isNaN(row) && !isNaN(col)) handleStart(row, col);
            }}
            onMouseMove={(e) => {
              if (!isSelecting) return;
              const target = document.elementFromPoint(
                e.clientX,
                e.clientY
              ) as HTMLElement;
              const row = parseInt(target.dataset.row || "");
              const col = parseInt(target.dataset.col || "");
              if (!isNaN(row) && !isNaN(col)) handleMove(row, col);
            }}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => {
              e.preventDefault();
              const touch = e.touches[0];
              const target = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              ) as HTMLElement;
              const row = parseInt(target.dataset.row || "");
              const col = parseInt(target.dataset.col || "");
              if (!isNaN(row) && !isNaN(col)) handleStart(row, col);
            }}
            onTouchMove={(e) => {
              if (!isSelecting) return;
              e.preventDefault();
              const touch = e.touches[0];
              const target = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              ) as HTMLElement;
              const row = parseInt(target.dataset.row || "");
              const col = parseInt(target.dataset.col || "");
              if (!isNaN(row) && !isNaN(col)) handleMove(row, col);
            }}
            onTouchEnd={handleEnd}
          >
            <div className="grid gap-1 md:gap-1.5 mx-auto" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}>
              {strandsData.grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => {
                  const isSelected = isCellSelected(rowIndex, colIndex);
                  const foundWord = getFoundWordForCell(rowIndex, colIndex);
                  const isFound = !!foundWord;

                  return (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      data-row={rowIndex}
                      data-col={colIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center
                        font-bold text-lg md:text-xl uppercase cursor-pointer
                        transition-all duration-200 touch-manipulation
                        ${
                          isFound
                            ? foundWord?.isSpangram
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground"
                            : isSelected
                            ? "bg-accent text-primary-foreground"
                            : "bg-card border border-border hover:border-primary-300"
                        }
                      `}
                    >
                      {letter}
                    </motion.div>
                  );
                })
              )}
            </div>

            {selectedCells.length > 0 && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 rounded-lg bg-primary-600 text-accent-foreground font-bold text-xl">
                {selectedCells.map((c) => c.letter).join("")}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {foundWords.map((fw, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`px-3 py-1.5 rounded-lg font-semibold text-md ${
                  fw.isSpangram
                    ? "bg-accent-500 text-accent-foreground"
                    : "bg-accent-500 text-accent-foreground"
                }`}
              >
                {fw.word}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {gameState === "won" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center mt-6"
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
                    Brilliant! All words found!
                  </h2>

                  <p className="text-success-600 dark:text-success-400 mb-4">
                    The spangram was <strong>{strandsData.spangram}</strong>
                  </p>

                  <Link
                    href="/crossword"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-success-500 text-white font-medium hover:bg-success-600 transition-colors"
                  >
                    Continue to Crossword
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {isReadonly && gameState !== "won" && (
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                You&apos;ve completed this puzzle!
              </p>
              <Link
                href="/crossword"
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
