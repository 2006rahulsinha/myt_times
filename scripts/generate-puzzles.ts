import fs from "node:fs";
import path from "node:path";
import Groq from "groq-sdk";
import clg from "crossword-layout-generator";
import { z } from "zod";
import { wordleData as previousWordleData } from "../data/wordle";

// ---------------------------------------------------------------------------
// Shared types (mirror the shapes app/*/page.tsx expect from data/*.ts)
// ---------------------------------------------------------------------------

interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  row: number;
  col: number;
}

interface CrosswordData {
  grid: string[][];
  across: CrosswordClue[];
  down: CrosswordClue[];
}

interface StrandsData {
  themeClue: string;
  grid: string[][];
  answers: string[];
  spangram: string;
}

interface SudokuGenResult {
  board: number[][];
  editableCells: { row: number; col: number }[];
}

interface WordleData {
  answer: string;
  validGuesses: string[];
}

interface ConnectionsGroup {
  name: string;
  color: "yellow" | "green" | "blue" | "purple";
  words: string[];
}

interface ConnectionsData {
  groups: ConnectionsGroup[];
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const ROOT = process.cwd();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const groq = new Groq({ apiKey: requireEnv("GROQ_API_KEY") });
const MODEL = "openai/gpt-oss-120b";

// One theme is picked per day and shared across all 5 puzzles for cohesion.
// Love/romance is still in the pool, just no longer the only option.
const THEMES = [
  "Love & Romance",
  "Outer Space",
  "Ocean Life",
  "Cooking & Food",
  "Movies & Cinema",
  "Video Games",
  "Travel & Adventure",
  "Music",
  "Sports",
  "Nature & Wildlife",
  "Mythology",
  "Fantasy Worlds",
  "Superheroes",
  "Dinosaurs",
  "Art & Painting",
  "Coffee Culture",
  "Autumn & Fall",
  "Winter & Snow",
  "Summer Vibes",
  "Camping & Outdoors",
  "Science Fiction",
  "Detective Mysteries",
  "Circus & Carnival",
  "Gardening",
  "Board Games",
  "Road Trips",
];

function pickDailyTheme(): string {
  return THEMES[Math.floor(Math.random() * THEMES.length)];
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function askGroqForJSON<T>(
  prompt: string,
  schema: z.ZodType<T>,
  maxAttempts = 3
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : raw);
      return schema.parse(parsed);
    } catch (err) {
      lastError = err;
      console.warn(`Groq JSON attempt ${attempt}/${maxAttempts} failed:`, err);
    }
  }

  throw new Error(
    `Failed to get valid JSON from Groq after ${maxAttempts} attempts: ${String(lastError)}`
  );
}

// ---------------------------------------------------------------------------
// Sudoku — pure algorithm, no LLM
// ---------------------------------------------------------------------------

function generateSudokuPuzzle(): SudokuGenResult {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  function isValid(row: number, col: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  }

  function fill(pos: number): boolean {
    if (pos === 81) return true;
    const row = Math.floor(pos / 9);
    const col = pos % 9;

    for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      if (isValid(row, col, num)) {
        board[row][col] = num;
        if (fill(pos + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  if (!fill(0)) {
    throw new Error("Failed to generate a solved sudoku board");
  }

  const allCells = shuffle(
    Array.from({ length: 81 }, (_, i) => ({ row: Math.floor(i / 9), col: i % 9 }))
  );
  const editableCells = allCells.slice(0, 5);

  return { board, editableCells };
}

// ---------------------------------------------------------------------------
// Wordle — LLM picks the themed answer; guesses reuse the existing 5-letter
// dictionary (regenerating hundreds of dictionary words via LLM daily would
// be wasteful and unreliable, and the UI only ever accepts 5-letter guesses)
// ---------------------------------------------------------------------------

const WordleAnswerSchema = z.object({
  answer: z.string().regex(/^[A-Za-z]{5}$/, "Answer must be exactly 5 letters"),
});

async function generateWordle(theme: string): Promise<WordleData> {
  const baseGuesses = Array.from(
    new Set(
      previousWordleData.validGuesses
        .map((w) => w.toUpperCase())
        .filter((w) => /^[A-Z]{5}$/.test(w))
    )
  );

  const { answer } = await askGroqForJSON(
    `Give me one 5-letter English word related to the theme "${theme}". ` +
      `It must be a common, real English word, exactly 5 letters, no proper nouns. ` +
      `Respond with ONLY JSON matching this shape, no markdown, no commentary: {"answer": "WORD"}`,
    WordleAnswerSchema
  );

  const upperAnswer = answer.toUpperCase();
  const validGuesses = Array.from(new Set([...baseGuesses, upperAnswer])).sort();

  return { answer: upperAnswer, validGuesses };
}

// ---------------------------------------------------------------------------
// Crossword — LLM proposes words/clues, crossword-layout-generator places them
// ---------------------------------------------------------------------------

const CrosswordWordsSchema = z.object({
  words: z
    .array(
      z.object({
        clue: z.string().min(5).max(140),
        answer: z.string().regex(/^[A-Za-z]{3,10}$/),
      })
    )
    .min(14)
    .max(20),
});

const MIN_PLACED_CROSSWORD_WORDS = 8;

function buildCrosswordData(
  layout: ReturnType<typeof clg.generateLayout>,
  placed: ReturnType<typeof clg.generateLayout>["result"]
): CrosswordData {
  const grid = layout.table.map((row) => row.map((cell) => (cell === "-" ? "#" : cell)));

  const toClue = (w: (typeof placed)[number]): CrosswordClue => ({
    number: w.position!,
    clue: w.clue,
    answer: w.answer,
    row: w.starty! - 1,
    col: w.startx! - 1,
  });

  const across = placed
    .filter((w) => w.orientation === "across")
    .map(toClue)
    .sort((a, b) => a.number - b.number);

  const down = placed
    .filter((w) => w.orientation === "down")
    .map(toClue)
    .sort((a, b) => a.number - b.number);

  return { grid, across, down };
}

async function generateCrossword(theme: string): Promise<CrosswordData> {
  for (let round = 1; round <= 3; round++) {
    const { words } = await askGroqForJSON(
      `Give me 16 short crossword words with clues, all related to the theme "${theme}". ` +
        `Clues should be fun and engaging, fitting the theme's tone (not dry dictionary definitions). ` +
        `Answers must be single English words, letters only, 3-10 letters, ` +
        `no proper nouns, no spaces or hyphens, a mix of lengths so they can intersect well. ` +
        `Respond with ONLY JSON, no markdown, no commentary: ` +
        `{"words":[{"clue":"...","answer":"..."}, ...]}`,
      CrosswordWordsSchema
    );

    const baseWords = words.map((w) => ({ clue: w.clue, answer: w.answer.toUpperCase() }));

    for (let attempt = 0; attempt < 12; attempt++) {
      const ordered = attempt === 0 ? baseWords : shuffle(baseWords);
      const layout = clg.generateLayout(ordered);
      const placed = layout.result.filter((w) => w.orientation !== "none");

      if (placed.length >= MIN_PLACED_CROSSWORD_WORDS) {
        return buildCrosswordData(layout, placed);
      }
    }

    console.warn(`Crossword round ${round} failed to produce a well-connected layout, retrying...`);
  }

  throw new Error("Could not generate a sufficiently connected crossword layout");
}

// ---------------------------------------------------------------------------
// Strands — LLM proposes theme/words, custom self-avoiding-walk placement
// ---------------------------------------------------------------------------

const STRANDS_ROWS = 7;
const STRANDS_COLS = 8;
const STRANDS_MAX_STEPS_PER_WORD = 15000;

const StrandsWordsSchema = z.object({
  themeClue: z.string().min(3).max(60),
  spangram: z.string().regex(/^[A-Za-z]{6,10}$/),
  words: z.array(z.string().regex(/^[A-Za-z]{4,7}$/)).min(4).max(6),
});

function neighborsOf(row: number, col: number): { row: number; col: number }[] {
  const out: { row: number; col: number }[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < STRANDS_ROWS && nc >= 0 && nc < STRANDS_COLS) {
        out.push({ row: nr, col: nc });
      }
    }
  }
  return shuffle(out);
}

function tryPlaceStrandsWord(
  grid: (string | null)[][],
  word: string
): { row: number; col: number }[] | null {
  const startCells = shuffle(
    Array.from({ length: STRANDS_ROWS * STRANDS_COLS }, (_, i) => ({
      row: Math.floor(i / STRANDS_COLS),
      col: i % STRANDS_COLS,
    }))
  );

  let steps = 0;

  for (const start of startCells) {
    const existing = grid[start.row][start.col];
    if (existing !== null && existing !== word[0]) continue;

    const path: { row: number; col: number }[] = [];
    const visited = new Set<string>();

    const backtrack = (index: number, row: number, col: number): boolean => {
      steps++;
      if (steps > STRANDS_MAX_STEPS_PER_WORD) return false;

      path.push({ row, col });
      visited.add(`${row},${col}`);

      if (index === word.length - 1) return true;

      for (const next of neighborsOf(row, col)) {
        const key = `${next.row},${next.col}`;
        if (visited.has(key)) continue;
        const needed = word[index + 1];
        const cellVal = grid[next.row][next.col];
        if (cellVal !== null && cellVal !== needed) continue;
        if (backtrack(index + 1, next.row, next.col)) return true;
      }

      path.pop();
      visited.delete(`${row},${col}`);
      return false;
    };

    if (backtrack(0, start.row, start.col)) return path;
    if (steps > STRANDS_MAX_STEPS_PER_WORD) return null;
  }

  return null;
}

function attemptStrandsLayout(
  spangram: string,
  words: string[]
): { grid: string[][]; answers: string[] } | null {
  const grid: (string | null)[][] = Array.from({ length: STRANDS_ROWS }, () =>
    Array<string | null>(STRANDS_COLS).fill(null)
  );

  const placementOrder = [spangram, ...shuffle(words)];

  for (const word of placementOrder) {
    const path = tryPlaceStrandsWord(grid, word);
    if (!path) return null;
    path.forEach((cell, i) => {
      grid[cell.row][cell.col] = word[i];
    });
  }

  const filledGrid: string[][] = grid.map((row) =>
    row.map((cell) => cell ?? String.fromCharCode(65 + Math.floor(Math.random() * 26)))
  );

  return { grid: filledGrid, answers: [spangram, ...words] };
}

async function generateStrands(theme: string): Promise<StrandsData> {
  for (let round = 1; round <= 3; round++) {
    const { themeClue, spangram, words } = await askGroqForJSON(
      `Give me content for a word-search puzzle called Strands, played on a ${STRANDS_ROWS}x${STRANDS_COLS} ` +
        `letter grid, all related to the theme "${theme}". Give me: a short theme clue phrase, one "spangram" ` +
        `word (6-10 letters) that captures the theme, and 4-6 supporting words (4-7 letters each) that all relate ` +
        `to the same theme. All words letters-only, no proper nouns, no spaces or hyphens. ` +
        `Respond with ONLY JSON, no markdown, no commentary: ` +
        `{"themeClue":"...","spangram":"...","words":["...", ...]}`,
      StrandsWordsSchema
    );

    const upperSpangram = spangram.toUpperCase();
    const upperWords = words.map((w) => w.toUpperCase());

    for (let attempt = 0; attempt < 25; attempt++) {
      const result = attemptStrandsLayout(upperSpangram, upperWords);
      if (result) {
        return {
          themeClue,
          grid: result.grid,
          answers: result.answers,
          spangram: upperSpangram,
        };
      }
    }

    console.warn(`Strands round ${round} failed to place all words, retrying with new words...`);
  }

  throw new Error("Could not place Strands words into the grid after multiple attempts");
}

// ---------------------------------------------------------------------------
// Connections — LLM proposes 4 groups of 4 words; colors are fixed locally
// (the component's colorStyles map only knows yellow/green/blue/purple)
// ---------------------------------------------------------------------------

const CONNECTIONS_COLORS: ConnectionsGroup["color"][] = ["yellow", "green", "blue", "purple"];

const ConnectionsWordsSchema = z.object({
  groups: z
    .array(
      z.object({
        name: z.string().min(2).max(30),
        words: z.array(z.string().min(2).max(20)).length(4),
      })
    )
    .length(4),
});

async function generateConnections(theme: string): Promise<ConnectionsData> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const { groups } = await askGroqForJSON(
      `Give me content for a Connections puzzle (like the NYT game): 4 groups of 4 words each, all related to ` +
        `the theme "${theme}". Each group should share a distinct sub-category within that theme. ` +
        `Each group needs a short category name (in title case) and exactly 4 words/short phrases. ` +
        `All 16 words across all groups must be distinct from each other. Words should be single words or short ` +
        `phrases, no punctuation. Respond with ONLY JSON, no markdown, no commentary: ` +
        `{"groups":[{"name":"...","words":["...","...","...","..."]}, ...]} (exactly 4 groups)`,
      ConnectionsWordsSchema
    );

    const upperWords = groups.flatMap((g) => g.words.map((w) => w.toUpperCase()));
    const uniqueCount = new Set(upperWords).size;

    if (uniqueCount === 16) {
      return {
        groups: groups.map((g, i) => ({
          name: g.name.toUpperCase(),
          color: CONNECTIONS_COLORS[i],
          words: g.words.map((w) => w.toUpperCase()),
        })),
      };
    }

    console.warn(`Connections attempt ${attempt} had duplicate words across groups, retrying...`);
  }

  throw new Error("Could not generate 16 distinct Connections words after multiple attempts");
}

// ---------------------------------------------------------------------------
// File writing
// ---------------------------------------------------------------------------

function writeDataFile(relativePath: string, content: string) {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf8");
}

function serializeCrossword(data: CrosswordData): string {
  return `export const crosswordData = ${JSON.stringify(data, null, 2)};\n`;
}

function serializeStrands(data: StrandsData): string {
  return `export const strandsData = ${JSON.stringify(data, null, 2)};\n`;
}

function serializeSudoku(data: SudokuGenResult): string {
  return `export const sudokuData = ${JSON.stringify(data, null, 2)};

export function getEmptyBoard(): (number | null)[][] {
  const { board, editableCells } = sudokuData;
  const emptyBoard: (number | null)[][] = board.map((row) =>
    row.map((cell) => cell)
  );

  editableCells.forEach(({ row, col }) => {
    emptyBoard[row][col] = null;
  });

  return emptyBoard;
}
`;
}

function serializeWordle(data: WordleData): string {
  return `export const wordleData = ${JSON.stringify(data, null, 2)};\n`;
}

function serializeConnections(data: ConnectionsData): string {
  return `export const connectionsData = ${JSON.stringify(data, null, 2)};\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const theme = pickDailyTheme();
  console.log(`Today's theme: ${theme}`);

  console.log("Generating sudoku...");
  const sudoku = generateSudokuPuzzle();

  console.log("Generating wordle...");
  const wordle = await generateWordle(theme);

  console.log("Generating crossword...");
  const crossword = await generateCrossword(theme);

  console.log("Generating strands...");
  const strands = await generateStrands(theme);

  console.log("Generating connections...");
  const connections = await generateConnections(theme);

  // Only write once every puzzle has generated successfully, so a mid-run
  // failure never leaves a partially-updated set of data files.
  writeDataFile("data/sudoku.ts", serializeSudoku(sudoku));
  writeDataFile("data/wordle.ts", serializeWordle(wordle));
  writeDataFile("data/crossword.ts", serializeCrossword(crossword));
  writeDataFile("data/strands.ts", serializeStrands(strands));
  writeDataFile("data/connections.ts", serializeConnections(connections));

  console.log("All puzzle data files regenerated successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
