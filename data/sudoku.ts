export const sudokuData = {
  "board": [
    [
      5,
      1,
      9,
      6,
      3,
      2,
      7,
      8,
      4
    ],
    [
      4,
      6,
      3,
      7,
      1,
      8,
      5,
      9,
      2
    ],
    [
      2,
      8,
      7,
      4,
      9,
      5,
      1,
      3,
      6
    ],
    [
      7,
      9,
      5,
      3,
      6,
      1,
      2,
      4,
      8
    ],
    [
      3,
      4,
      6,
      8,
      2,
      7,
      9,
      5,
      1
    ],
    [
      1,
      2,
      8,
      5,
      4,
      9,
      6,
      7,
      3
    ],
    [
      6,
      3,
      2,
      9,
      5,
      4,
      8,
      1,
      7
    ],
    [
      8,
      5,
      1,
      2,
      7,
      3,
      4,
      6,
      9
    ],
    [
      9,
      7,
      4,
      1,
      8,
      6,
      3,
      2,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 4,
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
