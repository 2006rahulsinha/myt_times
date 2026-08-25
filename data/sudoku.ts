export const sudokuData = {
  "board": [
    [
      5,
      2,
      4,
      8,
      6,
      1,
      3,
      9,
      7
    ],
    [
      3,
      7,
      1,
      5,
      2,
      9,
      4,
      8,
      6
    ],
    [
      6,
      9,
      8,
      7,
      3,
      4,
      1,
      2,
      5
    ],
    [
      1,
      8,
      3,
      4,
      9,
      6,
      5,
      7,
      2
    ],
    [
      2,
      4,
      6,
      1,
      7,
      5,
      9,
      3,
      8
    ],
    [
      9,
      5,
      7,
      3,
      8,
      2,
      6,
      4,
      1
    ],
    [
      4,
      6,
      9,
      2,
      1,
      8,
      7,
      5,
      3
    ],
    [
      8,
      3,
      5,
      6,
      4,
      7,
      2,
      1,
      9
    ],
    [
      7,
      1,
      2,
      9,
      5,
      3,
      8,
      6,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 8,
      "col": 3
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 0,
      "col": 2
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
