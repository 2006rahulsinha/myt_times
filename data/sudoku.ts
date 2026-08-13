export const sudokuData = {
  "board": [
    [
      4,
      5,
      1,
      3,
      7,
      6,
      8,
      2,
      9
    ],
    [
      6,
      2,
      7,
      4,
      9,
      8,
      5,
      1,
      3
    ],
    [
      9,
      8,
      3,
      1,
      2,
      5,
      4,
      6,
      7
    ],
    [
      1,
      6,
      5,
      9,
      4,
      7,
      3,
      8,
      2
    ],
    [
      7,
      4,
      8,
      5,
      3,
      2,
      1,
      9,
      6
    ],
    [
      3,
      9,
      2,
      8,
      6,
      1,
      7,
      5,
      4
    ],
    [
      5,
      3,
      9,
      6,
      8,
      4,
      2,
      7,
      1
    ],
    [
      2,
      1,
      6,
      7,
      5,
      3,
      9,
      4,
      8
    ],
    [
      8,
      7,
      4,
      2,
      1,
      9,
      6,
      3,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 4,
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
