export const sudokuData = {
  "board": [
    [
      8,
      1,
      7,
      9,
      5,
      2,
      4,
      3,
      6
    ],
    [
      6,
      4,
      3,
      1,
      8,
      7,
      2,
      5,
      9
    ],
    [
      9,
      5,
      2,
      4,
      6,
      3,
      7,
      1,
      8
    ],
    [
      2,
      8,
      1,
      3,
      9,
      6,
      5,
      4,
      7
    ],
    [
      4,
      7,
      9,
      2,
      1,
      5,
      6,
      8,
      3
    ],
    [
      5,
      3,
      6,
      7,
      4,
      8,
      9,
      2,
      1
    ],
    [
      7,
      9,
      8,
      5,
      2,
      1,
      3,
      6,
      4
    ],
    [
      3,
      6,
      5,
      8,
      7,
      4,
      1,
      9,
      2
    ],
    [
      1,
      2,
      4,
      6,
      3,
      9,
      8,
      7,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 4,
      "col": 6
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
