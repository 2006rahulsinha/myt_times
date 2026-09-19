export const sudokuData = {
  "board": [
    [
      7,
      2,
      1,
      6,
      4,
      9,
      5,
      3,
      8
    ],
    [
      3,
      6,
      5,
      2,
      8,
      7,
      9,
      1,
      4
    ],
    [
      4,
      8,
      9,
      1,
      3,
      5,
      2,
      6,
      7
    ],
    [
      1,
      5,
      4,
      3,
      9,
      8,
      7,
      2,
      6
    ],
    [
      6,
      3,
      7,
      5,
      1,
      2,
      8,
      4,
      9
    ],
    [
      8,
      9,
      2,
      7,
      6,
      4,
      3,
      5,
      1
    ],
    [
      5,
      7,
      6,
      9,
      2,
      1,
      4,
      8,
      3
    ],
    [
      9,
      1,
      8,
      4,
      5,
      3,
      6,
      7,
      2
    ],
    [
      2,
      4,
      3,
      8,
      7,
      6,
      1,
      9,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 5,
      "col": 5
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
