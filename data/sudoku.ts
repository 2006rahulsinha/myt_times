export const sudokuData = {
  "board": [
    [
      1,
      9,
      6,
      7,
      2,
      3,
      4,
      5,
      8
    ],
    [
      3,
      8,
      2,
      5,
      4,
      1,
      9,
      6,
      7
    ],
    [
      4,
      5,
      7,
      6,
      8,
      9,
      1,
      3,
      2
    ],
    [
      9,
      3,
      4,
      8,
      5,
      6,
      2,
      7,
      1
    ],
    [
      7,
      1,
      5,
      2,
      9,
      4,
      6,
      8,
      3
    ],
    [
      2,
      6,
      8,
      3,
      1,
      7,
      5,
      4,
      9
    ],
    [
      8,
      2,
      3,
      1,
      6,
      5,
      7,
      9,
      4
    ],
    [
      6,
      7,
      9,
      4,
      3,
      2,
      8,
      1,
      5
    ],
    [
      5,
      4,
      1,
      9,
      7,
      8,
      3,
      2,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 7,
      "col": 4
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 1,
      "col": 2
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
