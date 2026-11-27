export const sudokuData = {
  "board": [
    [
      8,
      6,
      9,
      1,
      2,
      4,
      3,
      5,
      7
    ],
    [
      7,
      3,
      2,
      6,
      8,
      5,
      1,
      9,
      4
    ],
    [
      1,
      4,
      5,
      3,
      9,
      7,
      2,
      6,
      8
    ],
    [
      5,
      9,
      3,
      4,
      6,
      2,
      7,
      8,
      1
    ],
    [
      6,
      8,
      1,
      9,
      7,
      3,
      4,
      2,
      5
    ],
    [
      4,
      2,
      7,
      5,
      1,
      8,
      6,
      3,
      9
    ],
    [
      9,
      1,
      8,
      2,
      4,
      6,
      5,
      7,
      3
    ],
    [
      3,
      7,
      6,
      8,
      5,
      1,
      9,
      4,
      2
    ],
    [
      2,
      5,
      4,
      7,
      3,
      9,
      8,
      1,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 0
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 7,
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
