export const sudokuData = {
  "board": [
    [
      5,
      4,
      6,
      1,
      8,
      2,
      9,
      7,
      3
    ],
    [
      3,
      8,
      9,
      7,
      6,
      5,
      4,
      1,
      2
    ],
    [
      2,
      7,
      1,
      4,
      9,
      3,
      5,
      6,
      8
    ],
    [
      6,
      3,
      4,
      8,
      2,
      1,
      7,
      5,
      9
    ],
    [
      7,
      1,
      2,
      3,
      5,
      9,
      6,
      8,
      4
    ],
    [
      8,
      9,
      5,
      6,
      7,
      4,
      2,
      3,
      1
    ],
    [
      4,
      6,
      3,
      9,
      1,
      7,
      8,
      2,
      5
    ],
    [
      1,
      2,
      8,
      5,
      4,
      6,
      3,
      9,
      7
    ],
    [
      9,
      5,
      7,
      2,
      3,
      8,
      1,
      4,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 4,
      "col": 7
    },
    {
      "row": 4,
      "col": 2
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
