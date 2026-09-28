export const sudokuData = {
  "board": [
    [
      9,
      8,
      5,
      2,
      7,
      4,
      6,
      1,
      3
    ],
    [
      3,
      2,
      7,
      9,
      6,
      1,
      8,
      4,
      5
    ],
    [
      4,
      1,
      6,
      8,
      5,
      3,
      9,
      2,
      7
    ],
    [
      6,
      5,
      3,
      4,
      2,
      9,
      1,
      7,
      8
    ],
    [
      2,
      9,
      4,
      1,
      8,
      7,
      3,
      5,
      6
    ],
    [
      1,
      7,
      8,
      5,
      3,
      6,
      4,
      9,
      2
    ],
    [
      7,
      4,
      2,
      6,
      9,
      8,
      5,
      3,
      1
    ],
    [
      8,
      3,
      1,
      7,
      4,
      5,
      2,
      6,
      9
    ],
    [
      5,
      6,
      9,
      3,
      1,
      2,
      7,
      8,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 5,
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
