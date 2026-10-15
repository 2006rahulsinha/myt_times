export const sudokuData = {
  "board": [
    [
      8,
      7,
      6,
      1,
      4,
      2,
      3,
      9,
      5
    ],
    [
      1,
      2,
      9,
      7,
      5,
      3,
      4,
      6,
      8
    ],
    [
      4,
      5,
      3,
      6,
      8,
      9,
      2,
      7,
      1
    ],
    [
      9,
      8,
      7,
      3,
      1,
      4,
      6,
      5,
      2
    ],
    [
      5,
      3,
      4,
      9,
      2,
      6,
      1,
      8,
      7
    ],
    [
      2,
      6,
      1,
      5,
      7,
      8,
      9,
      4,
      3
    ],
    [
      3,
      1,
      8,
      4,
      6,
      5,
      7,
      2,
      9
    ],
    [
      7,
      4,
      2,
      8,
      9,
      1,
      5,
      3,
      6
    ],
    [
      6,
      9,
      5,
      2,
      3,
      7,
      8,
      1,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 8
    },
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 8,
      "col": 2
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
