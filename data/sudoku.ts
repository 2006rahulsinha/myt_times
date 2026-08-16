export const sudokuData = {
  "board": [
    [
      1,
      5,
      7,
      8,
      2,
      6,
      3,
      4,
      9
    ],
    [
      4,
      3,
      2,
      7,
      9,
      1,
      5,
      6,
      8
    ],
    [
      9,
      6,
      8,
      4,
      3,
      5,
      2,
      7,
      1
    ],
    [
      5,
      8,
      1,
      9,
      6,
      4,
      7,
      2,
      3
    ],
    [
      6,
      2,
      9,
      3,
      8,
      7,
      4,
      1,
      5
    ],
    [
      3,
      7,
      4,
      5,
      1,
      2,
      9,
      8,
      6
    ],
    [
      8,
      1,
      5,
      2,
      4,
      3,
      6,
      9,
      7
    ],
    [
      2,
      9,
      3,
      6,
      7,
      8,
      1,
      5,
      4
    ],
    [
      7,
      4,
      6,
      1,
      5,
      9,
      8,
      3,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 8
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 3,
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
