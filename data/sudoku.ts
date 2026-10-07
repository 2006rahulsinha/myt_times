export const sudokuData = {
  "board": [
    [
      4,
      5,
      1,
      2,
      7,
      3,
      9,
      8,
      6
    ],
    [
      2,
      6,
      3,
      4,
      9,
      8,
      7,
      1,
      5
    ],
    [
      7,
      8,
      9,
      5,
      6,
      1,
      3,
      4,
      2
    ],
    [
      3,
      4,
      6,
      9,
      5,
      7,
      8,
      2,
      1
    ],
    [
      8,
      2,
      5,
      1,
      3,
      6,
      4,
      9,
      7
    ],
    [
      1,
      9,
      7,
      8,
      4,
      2,
      5,
      6,
      3
    ],
    [
      5,
      1,
      8,
      7,
      2,
      4,
      6,
      3,
      9
    ],
    [
      6,
      7,
      2,
      3,
      8,
      9,
      1,
      5,
      4
    ],
    [
      9,
      3,
      4,
      6,
      1,
      5,
      2,
      7,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 1,
      "col": 8
    },
    {
      "row": 0,
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
