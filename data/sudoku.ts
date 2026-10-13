export const sudokuData = {
  "board": [
    [
      8,
      9,
      1,
      3,
      2,
      7,
      6,
      4,
      5
    ],
    [
      7,
      4,
      6,
      5,
      8,
      1,
      9,
      3,
      2
    ],
    [
      5,
      3,
      2,
      4,
      6,
      9,
      7,
      1,
      8
    ],
    [
      3,
      1,
      7,
      9,
      5,
      2,
      4,
      8,
      6
    ],
    [
      4,
      2,
      8,
      7,
      1,
      6,
      5,
      9,
      3
    ],
    [
      6,
      5,
      9,
      8,
      4,
      3,
      2,
      7,
      1
    ],
    [
      1,
      7,
      5,
      6,
      9,
      8,
      3,
      2,
      4
    ],
    [
      9,
      8,
      4,
      2,
      3,
      5,
      1,
      6,
      7
    ],
    [
      2,
      6,
      3,
      1,
      7,
      4,
      8,
      5,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 2,
      "col": 0
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
