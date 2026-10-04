export const sudokuData = {
  "board": [
    [
      6,
      4,
      1,
      7,
      8,
      5,
      3,
      2,
      9
    ],
    [
      9,
      5,
      2,
      4,
      6,
      3,
      8,
      7,
      1
    ],
    [
      3,
      7,
      8,
      2,
      9,
      1,
      5,
      6,
      4
    ],
    [
      2,
      6,
      4,
      1,
      3,
      7,
      9,
      5,
      8
    ],
    [
      5,
      3,
      9,
      6,
      4,
      8,
      7,
      1,
      2
    ],
    [
      1,
      8,
      7,
      9,
      5,
      2,
      6,
      4,
      3
    ],
    [
      8,
      2,
      6,
      5,
      1,
      9,
      4,
      3,
      7
    ],
    [
      4,
      1,
      3,
      8,
      7,
      6,
      2,
      9,
      5
    ],
    [
      7,
      9,
      5,
      3,
      2,
      4,
      1,
      8,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 8,
      "col": 8
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
