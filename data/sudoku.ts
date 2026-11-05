export const sudokuData = {
  "board": [
    [
      3,
      8,
      9,
      6,
      7,
      2,
      5,
      4,
      1
    ],
    [
      7,
      6,
      2,
      1,
      4,
      5,
      3,
      8,
      9
    ],
    [
      1,
      5,
      4,
      8,
      9,
      3,
      2,
      6,
      7
    ],
    [
      5,
      7,
      6,
      4,
      8,
      9,
      1,
      2,
      3
    ],
    [
      4,
      9,
      1,
      3,
      2,
      7,
      6,
      5,
      8
    ],
    [
      8,
      2,
      3,
      5,
      6,
      1,
      7,
      9,
      4
    ],
    [
      9,
      4,
      7,
      2,
      3,
      6,
      8,
      1,
      5
    ],
    [
      6,
      3,
      5,
      9,
      1,
      8,
      4,
      7,
      2
    ],
    [
      2,
      1,
      8,
      7,
      5,
      4,
      9,
      3,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 5,
      "col": 7
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
