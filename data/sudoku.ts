export const sudokuData = {
  "board": [
    [
      6,
      2,
      5,
      8,
      7,
      3,
      9,
      4,
      1
    ],
    [
      1,
      7,
      4,
      5,
      9,
      6,
      3,
      2,
      8
    ],
    [
      9,
      8,
      3,
      4,
      2,
      1,
      5,
      7,
      6
    ],
    [
      7,
      6,
      1,
      3,
      8,
      9,
      4,
      5,
      2
    ],
    [
      4,
      5,
      8,
      2,
      6,
      7,
      1,
      9,
      3
    ],
    [
      2,
      3,
      9,
      1,
      4,
      5,
      8,
      6,
      7
    ],
    [
      3,
      1,
      2,
      6,
      5,
      4,
      7,
      8,
      9
    ],
    [
      5,
      9,
      6,
      7,
      1,
      8,
      2,
      3,
      4
    ],
    [
      8,
      4,
      7,
      9,
      3,
      2,
      6,
      1,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 8,
      "col": 7
    },
    {
      "row": 2,
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
