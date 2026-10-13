export const sudokuData = {
  "board": [
    [
      4,
      6,
      1,
      8,
      5,
      7,
      9,
      3,
      2
    ],
    [
      7,
      5,
      8,
      3,
      9,
      2,
      4,
      1,
      6
    ],
    [
      3,
      2,
      9,
      4,
      1,
      6,
      8,
      5,
      7
    ],
    [
      1,
      3,
      6,
      9,
      4,
      8,
      2,
      7,
      5
    ],
    [
      2,
      9,
      5,
      1,
      7,
      3,
      6,
      4,
      8
    ],
    [
      8,
      4,
      7,
      2,
      6,
      5,
      3,
      9,
      1
    ],
    [
      9,
      8,
      4,
      7,
      2,
      1,
      5,
      6,
      3
    ],
    [
      6,
      1,
      2,
      5,
      3,
      9,
      7,
      8,
      4
    ],
    [
      5,
      7,
      3,
      6,
      8,
      4,
      1,
      2,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 2,
      "col": 1
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
