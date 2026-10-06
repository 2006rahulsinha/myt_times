export const sudokuData = {
  "board": [
    [
      1,
      7,
      5,
      6,
      4,
      3,
      8,
      9,
      2
    ],
    [
      4,
      6,
      3,
      9,
      2,
      8,
      5,
      1,
      7
    ],
    [
      2,
      8,
      9,
      5,
      1,
      7,
      3,
      4,
      6
    ],
    [
      6,
      1,
      2,
      7,
      8,
      5,
      4,
      3,
      9
    ],
    [
      7,
      5,
      8,
      3,
      9,
      4,
      6,
      2,
      1
    ],
    [
      9,
      3,
      4,
      2,
      6,
      1,
      7,
      8,
      5
    ],
    [
      8,
      2,
      7,
      4,
      5,
      9,
      1,
      6,
      3
    ],
    [
      5,
      4,
      6,
      1,
      3,
      2,
      9,
      7,
      8
    ],
    [
      3,
      9,
      1,
      8,
      7,
      6,
      2,
      5,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 6,
      "col": 2
    },
    {
      "row": 3,
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
