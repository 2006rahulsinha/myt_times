export const sudokuData = {
  "board": [
    [
      3,
      7,
      8,
      2,
      6,
      4,
      5,
      9,
      1
    ],
    [
      9,
      6,
      1,
      7,
      3,
      5,
      4,
      2,
      8
    ],
    [
      5,
      2,
      4,
      9,
      1,
      8,
      6,
      7,
      3
    ],
    [
      8,
      1,
      7,
      3,
      4,
      9,
      2,
      5,
      6
    ],
    [
      6,
      9,
      2,
      1,
      5,
      7,
      3,
      8,
      4
    ],
    [
      4,
      5,
      3,
      8,
      2,
      6,
      7,
      1,
      9
    ],
    [
      2,
      4,
      9,
      6,
      7,
      1,
      8,
      3,
      5
    ],
    [
      1,
      3,
      5,
      4,
      8,
      2,
      9,
      6,
      7
    ],
    [
      7,
      8,
      6,
      5,
      9,
      3,
      1,
      4,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 8,
      "col": 2
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 2,
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
