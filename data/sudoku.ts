export const sudokuData = {
  "board": [
    [
      1,
      2,
      9,
      6,
      5,
      3,
      8,
      7,
      4
    ],
    [
      3,
      4,
      7,
      2,
      8,
      9,
      1,
      5,
      6
    ],
    [
      6,
      8,
      5,
      7,
      4,
      1,
      9,
      3,
      2
    ],
    [
      2,
      1,
      8,
      5,
      3,
      6,
      4,
      9,
      7
    ],
    [
      4,
      9,
      6,
      1,
      7,
      8,
      3,
      2,
      5
    ],
    [
      7,
      5,
      3,
      4,
      9,
      2,
      6,
      8,
      1
    ],
    [
      8,
      7,
      1,
      3,
      2,
      4,
      5,
      6,
      9
    ],
    [
      9,
      6,
      2,
      8,
      1,
      5,
      7,
      4,
      3
    ],
    [
      5,
      3,
      4,
      9,
      6,
      7,
      2,
      1,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 6,
      "col": 6
    }
  ]
};

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
