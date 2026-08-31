export const sudokuData = {
  "board": [
    [
      8,
      7,
      2,
      9,
      5,
      4,
      1,
      6,
      3
    ],
    [
      9,
      1,
      4,
      8,
      3,
      6,
      7,
      2,
      5
    ],
    [
      6,
      5,
      3,
      7,
      1,
      2,
      9,
      4,
      8
    ],
    [
      4,
      2,
      1,
      3,
      7,
      9,
      8,
      5,
      6
    ],
    [
      7,
      6,
      8,
      4,
      2,
      5,
      3,
      1,
      9
    ],
    [
      5,
      3,
      9,
      6,
      8,
      1,
      4,
      7,
      2
    ],
    [
      3,
      8,
      6,
      5,
      4,
      7,
      2,
      9,
      1
    ],
    [
      1,
      9,
      7,
      2,
      6,
      3,
      5,
      8,
      4
    ],
    [
      2,
      4,
      5,
      1,
      9,
      8,
      6,
      3,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 3,
      "col": 3
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
