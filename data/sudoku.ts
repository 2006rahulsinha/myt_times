export const sudokuData = {
  "board": [
    [
      9,
      3,
      6,
      7,
      8,
      5,
      1,
      4,
      2
    ],
    [
      5,
      7,
      4,
      6,
      2,
      1,
      9,
      8,
      3
    ],
    [
      1,
      8,
      2,
      9,
      3,
      4,
      6,
      5,
      7
    ],
    [
      3,
      2,
      9,
      8,
      1,
      7,
      5,
      6,
      4
    ],
    [
      6,
      5,
      1,
      3,
      4,
      9,
      2,
      7,
      8
    ],
    [
      8,
      4,
      7,
      2,
      5,
      6,
      3,
      9,
      1
    ],
    [
      4,
      9,
      3,
      5,
      7,
      2,
      8,
      1,
      6
    ],
    [
      7,
      6,
      8,
      1,
      9,
      3,
      4,
      2,
      5
    ],
    [
      2,
      1,
      5,
      4,
      6,
      8,
      7,
      3,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 1,
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
