export const sudokuData = {
  "board": [
    [
      3,
      4,
      1,
      6,
      2,
      8,
      9,
      5,
      7
    ],
    [
      6,
      5,
      7,
      3,
      1,
      9,
      4,
      2,
      8
    ],
    [
      2,
      9,
      8,
      5,
      7,
      4,
      1,
      6,
      3
    ],
    [
      7,
      1,
      2,
      4,
      5,
      3,
      6,
      8,
      9
    ],
    [
      4,
      8,
      5,
      7,
      9,
      6,
      2,
      3,
      1
    ],
    [
      9,
      3,
      6,
      1,
      8,
      2,
      5,
      7,
      4
    ],
    [
      1,
      6,
      9,
      2,
      3,
      7,
      8,
      4,
      5
    ],
    [
      8,
      2,
      3,
      9,
      4,
      5,
      7,
      1,
      6
    ],
    [
      5,
      7,
      4,
      8,
      6,
      1,
      3,
      9,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 2,
      "col": 4
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
