export const sudokuData = {
  "board": [
    [
      5,
      6,
      7,
      4,
      1,
      3,
      9,
      8,
      2
    ],
    [
      9,
      8,
      3,
      6,
      2,
      5,
      4,
      7,
      1
    ],
    [
      1,
      4,
      2,
      8,
      9,
      7,
      3,
      6,
      5
    ],
    [
      8,
      9,
      4,
      5,
      3,
      2,
      6,
      1,
      7
    ],
    [
      2,
      1,
      6,
      9,
      7,
      8,
      5,
      4,
      3
    ],
    [
      7,
      3,
      5,
      1,
      6,
      4,
      2,
      9,
      8
    ],
    [
      4,
      5,
      9,
      3,
      8,
      1,
      7,
      2,
      6
    ],
    [
      3,
      2,
      1,
      7,
      4,
      6,
      8,
      5,
      9
    ],
    [
      6,
      7,
      8,
      2,
      5,
      9,
      1,
      3,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 7,
      "col": 2
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 2,
      "col": 0
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
