export const sudokuData = {
  "board": [
    [
      3,
      2,
      7,
      1,
      5,
      8,
      4,
      9,
      6
    ],
    [
      8,
      9,
      5,
      2,
      4,
      6,
      1,
      7,
      3
    ],
    [
      1,
      6,
      4,
      3,
      7,
      9,
      8,
      5,
      2
    ],
    [
      5,
      4,
      3,
      9,
      6,
      2,
      7,
      1,
      8
    ],
    [
      2,
      8,
      9,
      4,
      1,
      7,
      3,
      6,
      5
    ],
    [
      7,
      1,
      6,
      8,
      3,
      5,
      2,
      4,
      9
    ],
    [
      6,
      3,
      8,
      7,
      9,
      1,
      5,
      2,
      4
    ],
    [
      9,
      7,
      2,
      5,
      8,
      4,
      6,
      3,
      1
    ],
    [
      4,
      5,
      1,
      6,
      2,
      3,
      9,
      8,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 2,
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
