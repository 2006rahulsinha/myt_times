export const sudokuData = {
  "board": [
    [
      3,
      6,
      7,
      2,
      8,
      5,
      9,
      4,
      1
    ],
    [
      8,
      2,
      1,
      4,
      3,
      9,
      6,
      5,
      7
    ],
    [
      5,
      9,
      4,
      6,
      1,
      7,
      8,
      3,
      2
    ],
    [
      6,
      3,
      2,
      1,
      9,
      8,
      5,
      7,
      4
    ],
    [
      7,
      4,
      8,
      3,
      5,
      6,
      2,
      1,
      9
    ],
    [
      1,
      5,
      9,
      7,
      2,
      4,
      3,
      6,
      8
    ],
    [
      9,
      8,
      3,
      5,
      4,
      1,
      7,
      2,
      6
    ],
    [
      4,
      7,
      5,
      8,
      6,
      2,
      1,
      9,
      3
    ],
    [
      2,
      1,
      6,
      9,
      7,
      3,
      4,
      8,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 8,
      "col": 3
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
