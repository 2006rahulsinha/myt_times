export const sudokuData = {
  "board": [
    [
      2,
      1,
      8,
      9,
      5,
      3,
      6,
      4,
      7
    ],
    [
      9,
      7,
      6,
      1,
      2,
      4,
      3,
      5,
      8
    ],
    [
      3,
      4,
      5,
      7,
      8,
      6,
      1,
      9,
      2
    ],
    [
      1,
      8,
      9,
      5,
      4,
      7,
      2,
      6,
      3
    ],
    [
      5,
      2,
      7,
      6,
      3,
      1,
      9,
      8,
      4
    ],
    [
      4,
      6,
      3,
      8,
      9,
      2,
      7,
      1,
      5
    ],
    [
      8,
      9,
      1,
      3,
      7,
      5,
      4,
      2,
      6
    ],
    [
      6,
      3,
      2,
      4,
      1,
      8,
      5,
      7,
      9
    ],
    [
      7,
      5,
      4,
      2,
      6,
      9,
      8,
      3,
      1
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 3,
      "col": 0
    },
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 6,
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
