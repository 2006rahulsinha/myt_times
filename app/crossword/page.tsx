"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PartyPopper } from "lucide-react";
import { PageWrapper } from "@/components/layout";
import { useProgressStore } from "@/store/progressStore";
import { crosswordData } from "@/data/crossword";

interface CellState {
  letter: string;
  isBlocked: boolean;
  userInput: string;
}

export default function CrosswordPage() {
  const router = useRouter();
  const { completePuzzle, completedPuzzles, isUnlocked } = useProgressStore();

  const [grid, setGrid] = useState<CellState[][]>(() =>
    crosswordData.grid.map((row) =>
      row.map((cell) => ({
        letter: cell === "#" ? "" : cell,
        isBlocked: cell === "#",
        userInput: "",
      }))
    )
  );

  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [gameState, setGameState] = useState<"playing" | "won">("playing");
  const [isReadonly, setIsReadonly] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    if (completedPuzzles.crossword) {
      setIsReadonly(true);
      const filledGrid = crosswordData.grid.map((row) =>
        row.map((cell) => ({
          letter: cell === "#" ? "" : cell,
          isBlocked: cell === "#",
          userInput: cell === "#" ? "" : cell,
        }))
      );
      setGrid(filledGrid);
      setGameState("won");
    }
  }, [completedPuzzles.crossword]);

  useEffect(() => {
    if (!isUnlocked("crossword")) {
      router.push("/");
    }
  }, [isUnlocked, router]);

  useEffect(() => {
    inputRefs.current = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => inputRefs.current[rowIndex]?.[colIndex] || null)
    );
  }, [grid]);

  const isComplete = useCallback(() => {
    return grid.every((row) =>
      row.every((cell) => cell.isBlocked || cell.userInput === cell.letter)
    );
  }, [grid]);

  const handleCellClick = (row: number, col: number) => {
    if (isReadonly || gameState !== "playing") return;
    if (grid[row][col].isBlocked) return;

    if (selectedRow === row && selectedCol === col) {
      setDirection(direction === "across" ? "down" : "across");
    } else {
      setSelectedRow(row);
      setSelectedCol(col);
    }
  };

  const handleKeyInput = useCallback(
    (key: string) => {
      if (isReadonly || gameState !== "playing") return;
      if (grid[selectedRow][selectedCol].isBlocked) return;

      if (key === "ArrowRight") {
        setDirection("across");
        moveSelection(0, 1);
        return;
      }

      if (key === "ArrowLeft") {
        setDirection("across");
        moveSelection(0, -1);
        return;
      }

      if (key === "ArrowDown") {
        setDirection("down");
        moveSelection(1, 0);
        return;
      }

      if (key === "ArrowUp") {
        setDirection("down");
        moveSelection(-1, 0);
        return;
      }

      if (key === "Tab") {
        moveToNextWord();
        return;
      }

      if (key === "Backspace") {
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[selectedRow][selectedCol].userInput = "";
          return newGrid;
        });

        if (direction === "across") {
          moveSelection(0, -1);
        } else {
          moveSelection(-1, 0);
        }
        return;
      }

      if (/^[a-zA-Z]$/.test(key)) {
        const upperKey = key.toUpperCase();
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[selectedRow][selectedCol].userInput = upperKey;
          return newGrid;
        });

        if (direction === "across") {
          moveSelection(0, 1);
        } else {
          moveSelection(1, 0);
        }

        if (isComplete()) {
          setTimeout(() => {
            setGameState("won");
            completePuzzle("crossword");
          }, 100);
        }
      }
    },
    [selectedRow, selectedCol, direction, grid, isReadonly, gameState, completePuzzle, isComplete]
  );

  const moveSelection = (rowDelta: number, colDelta: number) => {
    let newRow = selectedRow + rowDelta;
    let newCol = selectedCol + colDelta;

    while (
      newRow >= 0 &&
      newRow < grid.length &&
      newCol >= 0 &&
      newCol < grid[0].length
    ) {
      if (!grid[newRow][newCol].isBlocked) {
        setSelectedRow(newRow);
        setSelectedCol(newCol);
        return;
      }
      newRow += rowDelta;
      newCol += colDelta;
    }
  };

  const moveToNextWord = () => {
    const clues =
      direction === "across" ? crosswordData.across : crosswordData.down;
    const currentIndex = clues.findIndex(
      (clue) => clue.row === selectedRow && clue.col === selectedCol
    );

    if (currentIndex < clues.length - 1) {
      const nextClue = clues[currentIndex + 1];
      setSelectedRow(nextClue.row);
      setSelectedCol(nextClue.col);
    } else if (direction === "across") {
      setDirection("down");
      setSelectedRow(crosswordData.down[0].row);
      setSelectedCol(crosswordData.down[0].col);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        isReadonly ||
        gameState !== "playing" ||
        grid[selectedRow]?.[selectedCol]?.isBlocked
      ) {
        return;
      }
      handleKeyInput(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleKeyInput,
    isReadonly,
    gameState,
    selectedRow,
    selectedCol,
    grid,
  ]);

  const getActiveWordCells = (): { row: number; col: number }[] => {
    const cells: { row: number; col: number }[] = [];
    if (direction === "across") {
      for (let c = selectedCol; c >= 0 && !grid[selectedRow][c].isBlocked; c--) {
        cells.unshift({ row: selectedRow, col: c });
      }
      for (
        let c = selectedCol + 1;
        c < grid[0].length && !grid[selectedRow][c].isBlocked;
        c++
      ) {
        cells.push({ row: selectedRow, col: c });
      }
    } else {
      for (let r = selectedRow; r >= 0 && !grid[r][selectedCol].isBlocked; r--) {
        cells.unshift({ row: r, col: selectedCol });
      }
      for (
        let r = selectedRow + 1;
        r < grid.length && !grid[r][selectedCol].isBlocked;
        r++
      ) {
        cells.push({ row: r, col: selectedCol });
      }
    }
    return cells;
  };

  const activeWordCells = getActiveWordCells();

  const getClueNumber = (row: number, col: number): number | null => {
    const allClues = [...crosswordData.across, ...crosswordData.down];
    const clue = allClues.find((c) => c.row === row && c.col === col);
    return clue ? clue.number : null;
  };

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Crossword</h1>
            <p className="text-muted-foreground text-sm">
              Fill in the grid with words of affection
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="glass rounded-xl p-3 md:p-4 overflow-x-auto">
                <div
                  className="grid gap-0 mx-auto bg-border"
                  style={{
                    gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 50px))`,
                    maxWidth: "fit-content",
                    border: "2px solid var(--accent)",
                  }}
                >
                  {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => {
                      const isSelected =
                        selectedRow === rowIndex && selectedCol === colIndex;
                      const isInActiveWord = activeWordCells.some(
                        (c) => c.row === rowIndex && c.col === colIndex
                      );
                      const clueNumber = getClueNumber(rowIndex, colIndex);

                      return (
                        <motion.div
                          key={`${rowIndex}-${colIndex}`}
                          className={`
                            relative aspect-square flex items-center justify-center
                            font-bold text-4xl md:text-base uppercase cursor-pointer
                            transition-colors border border-border
                            ${
                              cell.isBlocked
                                ? "bg-primary-800 dark:bg-primary-900"
                                : isSelected
                                ? "bg-blue-400/50"
                                : isInActiveWord
                                ? "bg-primary-foreground"
                                : "bg-background hover:bg-muted"
                            }
                          `}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                          whileTap={{ scale: 0.95 }}
                        >
                          {!cell.isBlocked && (
                            <>
                              {clueNumber && (
                                <span className="absolute top-0.5 left-1 text-[10px] text-muted-foreground">
                                  {clueNumber}
                                </span>
                              )}

                              {cell.userInput && (
                                <span
                                  className={
                                    cell.userInput === cell.letter
                                      ? "text-secondary-foreground text-[32px]"
                                      : "text-red"
                                  }
                                >
                                  {cell.userInput}
                                </span>
                              )}

                              <input
                                ref={(el) => {
                                  if (!inputRefs.current[rowIndex]) {
                                    inputRefs.current[rowIndex] = [];
                                  }
                                  inputRefs.current[rowIndex][colIndex] = el;
                                }}
                                type="text"
                                maxLength={1}
                                value={cell.userInput}
                                onChange={() => {}}
                                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCellClick(rowIndex, colIndex);
                                }}
                                aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
                              />
                            </>
                          )}
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row space-y-0">
              <div className="glass rounded-xl p-4 w-96">
                <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-sm">
                    Across
                  </span>
                </h2>
                <ul className="space-y-4  text-l">
                  {crosswordData.across.map((clue, i) => {
                    const isActive =
                      selectedRow === clue.row &&
                      selectedCol === clue.col &&
                      direction === "across";
                    return (
                      <li
                        key={i}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          isActive
                            ? "bg-accent"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => {
                          setDirection("across");
                          setSelectedRow(clue.row);
                          setSelectedCol(clue.col);
                        }}
                      >
                        <span className="font-semibold mr-2">{clue.number}.</span>
                        {clue.clue}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="glass rounded-xl p-4 w-96 mx-3">
                <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-sm">
                    Down
                  </span>
                </h2>
                <ul className="space-y-2 text-sm">
                  {crosswordData.down.map((clue, i) => {
                    const isActive =
                      selectedRow === clue.row &&
                      selectedCol === clue.col &&
                      direction === "down";
                    return (
                      <li
                        key={i}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          isActive
                            ? "bg-accent"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => {
                          setDirection("down");
                          setSelectedRow(clue.row);
                          setSelectedCol(clue.col);
                        }}
                      >
                        <span className="font-semibold mr-2">{clue.number}.</span>
                        {clue.clue}
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
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
                    Perfect! Crossword complete!
                  </h2>

                  <p className="text-success-600 dark:text-success-400 mb-4">
                    Every word in place
                  </p>

                  <Link
                    href="/sudoku"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-success-500 text-white font-medium hover:bg-success-600 transition-colors"
                  >
                    Continue to Sudoku
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
                href="/sudoku"
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
