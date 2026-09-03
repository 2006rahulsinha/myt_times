export const sudokuData = {
  "board": [
    [
      7,
      5,
      1,
      2,
      9,
      6,
      4,
      8,
      3
    ],
    [
      8,
      9,
      4,
      1,
      3,
      7,
      2,
      6,
      5
    ],
    [
      3,
      2,
      6,
      5,
      4,
      8,
      1,
      7,
      9
    ],
    [
      1,
      8,
      2,
      4,
      6,
      9,
      3,
      5,
      7
    ],
    [
      4,
      3,
      5,
      8,
      7,
      2,
      9,
      1,
      6
    ],
    [
      6,
      7,
      9,
      3,
      5,
      1,
      8,
      2,
      4
    ],
    [
      5,
      6,
      8,
      9,
      1,
      3,
      7,
      4,
      2
    ],
    [
      9,
      1,
      7,
      6,
      2,
      4,
      5,
      3,
      8
    ],
    [
      2,
      4,
      3,
      7,
      8,
      5,
      6,
      9,
      1
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 4,
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
