"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { PartyPopper, Check } from "lucide-react";
import { PageWrapper } from "@/components/layout";
import { useProgressStore } from "@/store/progressStore";
import { sudokuData, getEmptyBoard } from "@/data/sudoku";

export default function SudokuPage() {
  const router = useRouter();
  const { completePuzzle, completedPuzzles, isUnlocked } = useProgressStore();

  const [board, setBoard] = useState<(number | null)[][]>(() =>
    getEmptyBoard()
  );
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [gameState, setGameState] = useState<"playing" | "won">("playing");
  const [isReadonly, setIsReadonly] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (completedPuzzles.sudoku) {
      setIsReadonly(true);
      setBoard(sudokuData.board);
      setGameState("won");
    }
  }, [completedPuzzles.sudoku]);

  useEffect(() => {
    if (!isUnlocked("sudoku")) {
      router.push("/");
    }
  }, [isUnlocked, router]);

  const isEditable = useCallback(
    (row: number, col: number): boolean => {
      return sudokuData.editableCells.some(
        (cell) => cell.row === row && cell.col === col
      );
    },
    []
  );

  const getErrors = useCallback(
    (currentBoard: (number | null)[][]): Set<string> => {
      const errorSet = new Set<string>();

      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const value = currentBoard[row][col];
          if (value === null) continue;

          for (let c = 0; c < 9; c++) {
            if (c !== col && currentBoard[row][c] === value) {
              errorSet.add(`${row}-${col}`);
              errorSet.add(`${row}-${c}`);
            }
          }

          for (let r = 0; r < 9; r++) {
            if (r !== row && currentBoard[r][col] === value) {
              errorSet.add(`${row}-${col}`);
              errorSet.add(`${r}-${col}`);
            }
          }

          const boxRow = Math.floor(row / 3) * 3;
          const boxCol = Math.floor(col / 3) * 3;

          for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
              if ((r !== row || c !== col) && currentBoard[r][c] === value) {
                errorSet.add(`${row}-${col}`);
                errorSet.add(`${r}-${c}`);
              }
            }
          }
        }
      }

      return errorSet;
    },
    []
  );

  const checkCompletion = useCallback(
    (currentBoard: (number | null)[][]): boolean => {
      sudokuData.editableCells.forEach(({ row, col }) => {
        if (currentBoard[row][col] !== sudokuData.board[row][col]) {
          return false;
        }
      });

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (currentBoard[r][c] !== sudokuData.board[r][c]) {
            return false;
          }
        }
      }

      return true;
    },
    []
  );

  const handleCellClick = (row: number, col: number) => {
    if (isReadonly || gameState !== "playing") return;
    if (!isEditable(row, col)) return;

    if (selectedCell?.row === row && selectedCell?.col === col) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row, col });
    }
  };
  const enteredNumbers = sudokuData.editableCells
  .map(({ row, col }) => board[row][col])
  .filter((cell): cell is number => cell !== null);
  const handleNumberInput = useCallback(
    (num: number) => {
      if (
        isReadonly ||
        gameState !== "playing" ||
        !selectedCell ||
        !isEditable(selectedCell.row, selectedCell.col)
      ) {
        return;
      }

      setBoard((prev) => {
        const newBoard = prev.map((row) => [...row]);
        newBoard[selectedCell.row][selectedCell.col] = num === 0 ? null : num;

        const newErrors = getErrors(newBoard);
        setErrors(newErrors);

        if (newErrors.size === 0 && checkCompletion(newBoard)) {
          setTimeout(() => {
            setGameState("won");
            completePuzzle("sudoku");
          }, 500);
        }

        return newBoard;
      });
    },
    [
      selectedCell,
      isEditable,
      isReadonly,
      gameState,
      getErrors,
      checkCompletion,
      completePuzzle,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReadonly || gameState !== "playing") return;

      if (e.key === "ArrowUp" && selectedCell) {
        e.preventDefault();
        for (let r = selectedCell.row - 1; r >= 0; r--) {
          if (isEditable(r, selectedCell.col)) {
            setSelectedCell({ row: r, col: selectedCell.col });
            break;
          }
        }
      }

      if (e.key === "ArrowDown" && selectedCell) {
        e.preventDefault();
        for (let r = selectedCell.row + 1; r < 9; r++) {
          if (isEditable(r, selectedCell.col)) {
            setSelectedCell({ row: r, col: selectedCell.col });
            break;
          }
        }
      }

      if (e.key === "ArrowLeft" && selectedCell) {
        e.preventDefault();
        for (let c = selectedCell.col - 1; c >= 0; c--) {
          if (isEditable(selectedCell.row, c)) {
            setSelectedCell({ row: selectedCell.row, col: c });
            break;
          }
        }
      }

      if (e.key === "ArrowRight" && selectedCell) {
        e.preventDefault();
        for (let c = selectedCell.col + 1; c < 9; c++) {
          if (isEditable(selectedCell.row, c)) {
            setSelectedCell({ row: selectedCell.row, col: c });
            break;
          }
        }
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        handleNumberInput(0);
      }

      if (/^[1-9]$/.test(e.key)) {
        handleNumberInput(parseInt(e.key, 10));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedCell,
    isEditable,
    isReadonly,
    gameState,
    handleNumberInput,
  ]);

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Sudoku Challenge
            </h1>
            <p className="text-muted-foreground text-sm">
              Fill in the highlighted cells to complete the grid
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="inline-block p-1 rounded-xl glass">
              <div className="grid grid-cols-9 gap-0"
              style={{
                    gridTemplateColumns: `repeat(9, minmax(0, 100px))`,
                    maxWidth: "fit-content",
                    border: "2px solid var(--accent)",
                  }}
                >
                {board.map((row, rowIdx) =>
                  row.map((cell, colIdx) => {
                    const editable = isEditable(rowIdx, colIdx);
                    const isSelected =
                      selectedCell?.row === rowIdx &&
                      selectedCell?.col === colIdx;
                    const isInSameRow = selectedCell?.row === rowIdx;
                    const isInSameCol = selectedCell?.col === colIdx;
                    const isInSameBox =
                      Math.floor((selectedCell?.row ?? -1) / 3) ===
                        Math.floor(rowIdx / 3) &&
                      Math.floor((selectedCell?.col ?? -1) / 3) ===
                        Math.floor(colIdx / 3);
                    const isError = errors.has(`${rowIdx}-${colIdx}`);
                    const isBoxBorderRight = (colIdx + 1) % 3 === 0 && colIdx < 8;
                    const isBoxBorderBottom =
                      (rowIdx + 1) % 3 === 0 && rowIdx < 8;

                    let bgColor = "bg-background";
                    if (isSelected) {
                      bgColor = "bg-accent";
                    } else if (isError) {
                      bgColor = "bg-destructive-200";
                    } else if (isInSameRow || isInSameCol || isInSameBox) {
                      bgColor = "bg-primary-100 dark:bg-primary-900/20";
                    }

                    return (
                      <motion.button
                        key={`${rowIdx}-${colIdx}`}
                        className={`
                          w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                          font-bold text-sm md:text-base
                          transition-colors
                          ${bgColor}
                          ${editable ? "cursor-pointer hover:bg-accent-100" : "cursor-default"}
                          ${editable ? "border-primary-400" : "border-border"}
                          ${!editable ? "font-extrabold" : ""}
                          ${isBoxBorderRight ? "border-r-2 border-primary-400 dark:border-primary-600" : "border-r-2 border-primary-400 dark:border-primary-600"}
                          ${isBoxBorderBottom ? "border-b-2 border-primary-400 dark:border-primary-600" : "border-b-2 border-primary-400 dark:border-primary-600"}
                        `}
                        onClick={() => handleCellClick(rowIdx, colIdx)}
                        whileTap={{ scale: editable ? 0.95 : 1 }}
                        disabled={!editable}
                        aria-label={`Cell ${rowIdx + 1}, ${colIdx + 1}${
                          editable ? "" : " (pre-filled)"
                        }`}
                      >
                        {cell || ""}
                      </motion.button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {gameState === "playing" && !isReadonly && (
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="grid grid-cols-9 gap-2 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <motion.button
                    key={num}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleNumberInput(num)}
                    className="aspect-square rounded-lg bg-card border border-border font-bold text-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors focus:ring-2 focus:ring-primary-500"
                      aria-label={`Enter ${num}`}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center mt-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberInput(0)}
                  className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
                >
                  Clear
                </motion.button>
              </div>
            </div>
            
          )}
          <div className="mt-4 text-center font-bold text-3xl">
            {enteredNumbers.join(" ")}
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
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                    className="inline-block mb-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-success-500 flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>

                  <h2 className="text-xl font-bold text-success-700 dark:text-success-300 mb-2">
                    Magnificent! Puzzle complete!
                  </h2>

                  <p className="text-success-600 dark:text-success-400 mb-4">
                    Every number in its perfect place
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/unlock")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-success-500 text-white font-medium hover:bg-success-600 transition-colors"
                  >
                    <PartyPopper className="w-5 h-5" />
                    Final Step Awaits
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {isReadonly && gameState !== "won" && (
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                You&apos;ve completed this puzzle!
              </p>
              <button
                onClick={() => router.push("/unlock")}
                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg bg-primary-500 text-primary-foreground font-medium hover:bg-primary-600 transition-colors"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
