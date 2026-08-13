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
// Strands — words must fully tile the grid with zero overlap and zero unused
// cells. Rather than randomly placing words and hoping they happen to cover
// everything, we build one random Hamiltonian path that visits every cell of
// the grid exactly once, then cut it into contiguous chunks (one per word).
// Every chunk is adjacent-cell-valid and cell-disjoint by construction, and
// the chunks always sum to the full grid — so coverage is guaranteed rather
// than hoped for. Word *lengths* are therefore fixed locally first (so they
// sum to exactly 56), and the LLM is asked to fill in words of those exact
// lengths.
// ---------------------------------------------------------------------------

const STRANDS_ROWS = 7;
const STRANDS_COLS = 8;
const STRANDS_CELL_COUNT = STRANDS_ROWS * STRANDS_COLS;
const STRANDS_HAMPATH_MAX_STEPS = 20000;
const STRANDS_HAMPATH_ATTEMPTS = 8;
const STRANDS_WORD_MIN_LEN = 4;
const STRANDS_WORD_MAX_LEN = 9;

type Cell = { row: number; col: number };

function buildHamiltonianPath(): Cell[] {
  function unvisitedNeighbors(visited: Set<string>, row: number, col: number): Cell[] {
    const out: Cell[] = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr;
        const nc = col + dc;
        if (nr < 0 || nr >= STRANDS_ROWS || nc < 0 || nc >= STRANDS_COLS) continue;
        if (visited.has(`${nr},${nc}`)) continue;
        out.push({ row: nr, col: nc });
      }
    }
    return out;
  }

  function attempt(): Cell[] | null {
    const visited = new Set<string>();
    const path: Cell[] = [];
    let steps = 0;

    function backtrack(row: number, col: number): boolean {
      steps++;
      if (steps > STRANDS_HAMPATH_MAX_STEPS) return false;

      visited.add(`${row},${col}`);
      path.push({ row, col });
      if (path.length === STRANDS_CELL_COUNT) return true;

      // Warnsdorff's rule: try the neighbor with the fewest onward options
      // first — this alone solves grid Hamiltonian-path problems almost
      // every time without needing real backtracking.
      const candidates = shuffle(unvisitedNeighbors(visited, row, col)).sort(
        (a, b) =>
          unvisitedNeighbors(visited, a.row, a.col).length -
          unvisitedNeighbors(visited, b.row, b.col).length
      );

      for (const next of candidates) {
        if (backtrack(next.row, next.col)) return true;
      }

      path.pop();
      visited.delete(`${row},${col}`);
      return false;
    }

    const startRow = Math.floor(Math.random() * STRANDS_ROWS);
    const startCol = Math.floor(Math.random() * STRANDS_COLS);
    return backtrack(startRow, startCol) ? path : null;
  }

  for (let i = 0; i < STRANDS_HAMPATH_ATTEMPTS; i++) {
    const result = attempt();
    if (result) return result;
  }

  // Guaranteed-correct fallback: a plain boustrophedon (snake) traversal is
  // always a valid Hamiltonian path over a rectangular grid.
  const fallback: Cell[] = [];
  for (let r = 0; r < STRANDS_ROWS; r++) {
    if (r % 2 === 0) {
      for (let c = 0; c < STRANDS_COLS; c++) fallback.push({ row: r, col: c });
    } else {
      for (let c = STRANDS_COLS - 1; c >= 0; c--) fallback.push({ row: r, col: c });
    }
  }
  return fallback;
}

function pickStrandsWordLengths(): { spangramLength: number; wordLengths: number[] } {
  const spangramLength = 8 + Math.floor(Math.random() * 5); // 8-12
  const remaining = STRANDS_CELL_COUNT - spangramLength;

  const minCount = Math.max(4, Math.ceil(remaining / STRANDS_WORD_MAX_LEN));
  const maxCount = Math.min(6, Math.floor(remaining / STRANDS_WORD_MIN_LEN));
  const wordCount = minCount + Math.floor(Math.random() * (maxCount - minCount + 1));

  const lengths = Array(wordCount).fill(STRANDS_WORD_MIN_LEN);
  let leftover = remaining - STRANDS_WORD_MIN_LEN * wordCount;
  while (leftover > 0) {
    const idx = Math.floor(Math.random() * wordCount);
    if (lengths[idx] < STRANDS_WORD_MAX_LEN) {
      lengths[idx]++;
      leftover--;
    }
  }

  return { spangramLength, wordLengths: shuffle(lengths) };
}

function buildStrandsSchema(spangramLength: number, wordLengths: number[]) {
  return z
    .object({
      themeClue: z.string().min(3).max(60),
      spangram: z.string().regex(/^[A-Za-z]+$/).length(spangramLength),
      words: z.array(z.string().regex(/^[A-Za-z]+$/)).length(wordLengths.length),
    })
    .refine((data) => data.words.every((w, i) => w.length === wordLengths[i]), {
      message: "Word lengths must match the required lengths, in order",
    });
}

async function generateStrands(theme: string): Promise<StrandsData> {
  for (let round = 1; round <= 3; round++) {
    const { spangramLength, wordLengths } = pickStrandsWordLengths();
    const schema = buildStrandsSchema(spangramLength, wordLengths);

    try {
      const { themeClue, spangram, words } = await askGroqForJSON(
        `Give me content for a word-search puzzle called Strands, related to the theme "${theme}". ` +
          `Give me a short theme clue phrase, one "spangram" word/phrase (letters only, no spaces) that is ` +
          `EXACTLY ${spangramLength} letters long and captures the theme, and exactly ${wordLengths.length} ` +
          `more theme-related words with these EXACT letter counts, in this exact order: ` +
          `[${wordLengths.join(", ")}]. All words letters-only, no proper nouns, no spaces or hyphens, and the ` +
          `letter counts must match precisely. Respond with ONLY JSON, no markdown, no commentary: ` +
          `{"themeClue":"...","spangram":"...","words":["...", ...]}`,
        schema,
        5
      );

      const upperSpangram = spangram.toUpperCase();
      const upperWords = words.map((w) => w.toUpperCase());
      const segments = [upperSpangram, ...upperWords];
      const path = buildHamiltonianPath();

      const grid: string[][] = Array.from({ length: STRANDS_ROWS }, () =>
        Array<string>(STRANDS_COLS).fill("")
      );

      let cursor = 0;
      for (const word of segments) {
        for (const letter of word) {
          const cell = path[cursor];
          grid[cell.row][cell.col] = letter;
          cursor++;
        }
      }

      if (grid.some((row) => row.some((cell) => cell === ""))) {
        throw new Error("Hamiltonian path did not fully cover the grid");
      }

      return { themeClue, grid, answers: segments, spangram: upperSpangram };
    } catch (err) {
      console.warn(`Strands round ${round} failed:`, err);
    }
  }

  throw new Error("Could not generate a fully-covering Strands layout after multiple attempts");
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
