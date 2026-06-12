export type PuzzleId =
  | "wordle"
  | "connections"
  | "strands"
  | "crossword"
  | "sudoku"
  | "unlock";

export interface PuzzleProgress {
  completedPuzzles: Record<PuzzleId, boolean>;
  currentStage: number;
  unlocked: boolean;
}

export const PUZZLE_ORDER: PuzzleId[] = [
  "wordle",
  "connections",
  "strands",
  "crossword",
  "sudoku",
  "unlock",
];

export const PUZZLE_NAMES: Record<PuzzleId, string> = {
  wordle: "Wordle",
  connections: "Connections",
  strands: "Strands",
  crossword: "Crossword",
  sudoku: "Sudoku Challenge",
  unlock: "Final Unlock",
};
