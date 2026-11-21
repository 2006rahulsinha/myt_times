export const sudokuData = {
  "board": [
    [
      8,
      2,
      9,
      3,
      5,
      1,
      4,
      6,
      7
    ],
    [
      7,
      1,
      4,
      2,
      6,
      8,
      9,
      3,
      5
    ],
    [
      3,
      6,
      5,
      7,
      9,
      4,
      1,
      2,
      8
    ],
    [
      6,
      3,
      8,
      9,
      7,
      2,
      5,
      4,
      1
    ],
    [
      9,
      7,
      2,
      4,
      1,
      5,
      6,
      8,
      3
    ],
    [
      4,
      5,
      1,
      6,
      8,
      3,
      7,
      9,
      2
    ],
    [
      2,
      4,
      7,
      1,
      3,
      9,
      8,
      5,
      6
    ],
    [
      1,
      8,
      3,
      5,
      4,
      6,
      2,
      7,
      9
    ],
    [
      5,
      9,
      6,
      8,
      2,
      7,
      3,
      1,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 1,
      "col": 6
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
