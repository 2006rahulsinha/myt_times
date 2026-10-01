export const sudokuData = {
  "board": [
    [
      8,
      7,
      5,
      9,
      4,
      3,
      6,
      1,
      2
    ],
    [
      3,
      4,
      6,
      7,
      2,
      1,
      8,
      5,
      9
    ],
    [
      1,
      2,
      9,
      6,
      8,
      5,
      7,
      3,
      4
    ],
    [
      4,
      3,
      7,
      2,
      1,
      6,
      5,
      9,
      8
    ],
    [
      6,
      9,
      8,
      5,
      7,
      4,
      3,
      2,
      1
    ],
    [
      2,
      5,
      1,
      3,
      9,
      8,
      4,
      7,
      6
    ],
    [
      7,
      8,
      3,
      1,
      6,
      9,
      2,
      4,
      5
    ],
    [
      5,
      1,
      4,
      8,
      3,
      2,
      9,
      6,
      7
    ],
    [
      9,
      6,
      2,
      4,
      5,
      7,
      1,
      8,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 1,
      "col": 8
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 2,
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
