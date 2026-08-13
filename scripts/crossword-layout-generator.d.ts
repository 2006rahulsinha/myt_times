declare module "crossword-layout-generator" {
  export interface CrosswordInputWord {
    clue: string;
    answer: string;
  }

  export interface CrosswordResultWord extends CrosswordInputWord {
    startx?: number;
    starty?: number;
    position?: number;
    orientation: "across" | "down" | "none";
  }

  export interface CrosswordLayout {
    rows: number;
    cols: number;
    table: string[][];
    table_string: string;
    result: CrosswordResultWord[];
  }

  const crosswordLayoutGenerator: {
    generateLayout(input: CrosswordInputWord[]): CrosswordLayout;
  };

  export default crosswordLayoutGenerator;
}
