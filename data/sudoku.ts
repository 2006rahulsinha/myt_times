export const sudokuData = {
  "board": [
    [
      1,
      2,
      3,
      9,
      7,
      6,
      8,
      5,
      4
    ],
    [
      9,
      4,
      5,
      3,
      2,
      8,
      7,
      6,
      1
    ],
    [
      8,
      7,
      6,
      1,
      4,
      5,
      2,
      9,
      3
    ],
    [
      3,
      9,
      4,
      6,
      1,
      7,
      5,
      8,
      2
    ],
    [
      2,
      5,
      1,
      8,
      9,
      4,
      6,
      3,
      7
    ],
    [
      6,
      8,
      7,
      2,
      5,
      3,
      4,
      1,
      9
    ],
    [
      7,
      6,
      8,
      4,
      3,
      9,
      1,
      2,
      5
    ],
    [
      4,
      1,
      9,
      5,
      8,
      2,
      3,
      7,
      6
    ],
    [
      5,
      3,
      2,
      7,
      6,
      1,
      9,
      4,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 2,
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
