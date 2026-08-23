export const sudokuData = {
  "board": [
    [
      3,
      5,
      9,
      2,
      6,
      4,
      8,
      1,
      7
    ],
    [
      8,
      6,
      7,
      3,
      9,
      1,
      5,
      4,
      2
    ],
    [
      2,
      1,
      4,
      7,
      8,
      5,
      3,
      9,
      6
    ],
    [
      7,
      3,
      6,
      5,
      4,
      9,
      2,
      8,
      1
    ],
    [
      1,
      9,
      2,
      8,
      7,
      6,
      4,
      3,
      5
    ],
    [
      4,
      8,
      5,
      1,
      2,
      3,
      7,
      6,
      9
    ],
    [
      6,
      4,
      8,
      9,
      5,
      7,
      1,
      2,
      3
    ],
    [
      9,
      7,
      1,
      4,
      3,
      2,
      6,
      5,
      8
    ],
    [
      5,
      2,
      3,
      6,
      1,
      8,
      9,
      7,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 8,
      "col": 0
    },
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 0,
      "col": 5
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
