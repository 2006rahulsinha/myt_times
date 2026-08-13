export const sudokuData = {
  "board": [
    [
      3,
      1,
      9,
      5,
      2,
      8,
      4,
      7,
      6
    ],
    [
      8,
      6,
      4,
      3,
      7,
      1,
      5,
      9,
      2
    ],
    [
      5,
      7,
      2,
      4,
      9,
      6,
      3,
      1,
      8
    ],
    [
      2,
      5,
      7,
      1,
      4,
      9,
      6,
      8,
      3
    ],
    [
      6,
      8,
      3,
      2,
      5,
      7,
      9,
      4,
      1
    ],
    [
      9,
      4,
      1,
      6,
      8,
      3,
      2,
      5,
      7
    ],
    [
      1,
      2,
      5,
      7,
      3,
      4,
      8,
      6,
      9
    ],
    [
      4,
      9,
      6,
      8,
      1,
      2,
      7,
      3,
      5
    ],
    [
      7,
      3,
      8,
      9,
      6,
      5,
      1,
      2,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 5,
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
