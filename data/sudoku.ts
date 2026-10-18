export const sudokuData = {
  "board": [
    [
      3,
      6,
      5,
      8,
      7,
      2,
      1,
      9,
      4
    ],
    [
      7,
      4,
      2,
      5,
      9,
      1,
      8,
      3,
      6
    ],
    [
      1,
      8,
      9,
      3,
      4,
      6,
      2,
      7,
      5
    ],
    [
      5,
      3,
      6,
      2,
      1,
      4,
      9,
      8,
      7
    ],
    [
      4,
      9,
      8,
      7,
      6,
      3,
      5,
      2,
      1
    ],
    [
      2,
      7,
      1,
      9,
      5,
      8,
      4,
      6,
      3
    ],
    [
      6,
      1,
      3,
      4,
      2,
      9,
      7,
      5,
      8
    ],
    [
      9,
      5,
      4,
      6,
      8,
      7,
      3,
      1,
      2
    ],
    [
      8,
      2,
      7,
      1,
      3,
      5,
      6,
      4,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 1,
      "col": 8
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 6,
      "col": 2
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
