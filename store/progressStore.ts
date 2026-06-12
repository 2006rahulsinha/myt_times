"use client";

import { create } from "zustand";
import { PuzzleId, PUZZLE_ORDER } from "@/types/puzzle";

interface ProgressState {
  completedPuzzles: Record<PuzzleId, boolean>;
  currentStage: number;
  unlocked: boolean;
  completePuzzle: (id: PuzzleId) => void;
  resetProgress: () => void;
  getCurrentStage: () => number;
  isUnlocked: (id: PuzzleId) => boolean;
  setUnlocked: (value: boolean) => void;
}

const initialCompletedPuzzles: Record<PuzzleId, boolean> = {
  wordle: false,
  connections: false,
  strands: false,
  crossword: false,
  sudoku: false,
  unlock: false,
};

export const useProgressStore = create<ProgressState>()((set, get) => ({
  completedPuzzles: initialCompletedPuzzles,
  currentStage: 0,
  unlocked: false,

  completePuzzle: (id: PuzzleId) => {
    const state = get();
    if (state.completedPuzzles[id]) return;

    const puzzleIndex = PUZZLE_ORDER.indexOf(id);
    const newCompleted = { ...state.completedPuzzles, [id]: true };
    const nextStage = Math.max(state.currentStage, puzzleIndex + 1);

    set({
      completedPuzzles: newCompleted,
      currentStage: nextStage,
    });
  },

  resetProgress: () => {
    set({
      completedPuzzles: initialCompletedPuzzles,
      currentStage: 0,
      unlocked: false,
    });
  },

  getCurrentStage: () => get().currentStage,

  isUnlocked: (id: PuzzleId) => {
    const state = get();
    const puzzleIndex = PUZZLE_ORDER.indexOf(id);

    if (puzzleIndex === -1) return false;
    if (state.completedPuzzles[id]) return true;
    if (puzzleIndex === 0) return true;

    const previousPuzzle = PUZZLE_ORDER[puzzleIndex - 1];
    return state.completedPuzzles[previousPuzzle];
  },

  setUnlocked: (value: boolean) => {
    set({ unlocked: value });
  },
}));