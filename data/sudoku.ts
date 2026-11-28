export const sudokuData = {
  "board": [
    [
      7,
      1,
      8,
      5,
      3,
      2,
      6,
      9,
      4
    ],
    [
      3,
      2,
      5,
      4,
      6,
      9,
      7,
      8,
      1
    ],
    [
      6,
      4,
      9,
      7,
      8,
      1,
      5,
      3,
      2
    ],
    [
      8,
      9,
      1,
      2,
      7,
      6,
      3,
      4,
      5
    ],
    [
      2,
      5,
      3,
      9,
      1,
      4,
      8,
      6,
      7
    ],
    [
      4,
      7,
      6,
      8,
      5,
      3,
      2,
      1,
      9
    ],
    [
      5,
      3,
      4,
      1,
      2,
      8,
      9,
      7,
      6
    ],
    [
      1,
      6,
      7,
      3,
      9,
      5,
      4,
      2,
      8
    ],
    [
      9,
      8,
      2,
      6,
      4,
      7,
      1,
      5,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 1,
      "col": 8
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
