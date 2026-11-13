export const sudokuData = {
  "board": [
    [
      1,
      9,
      8,
      3,
      5,
      4,
      2,
      7,
      6
    ],
    [
      7,
      6,
      2,
      1,
      8,
      9,
      5,
      4,
      3
    ],
    [
      3,
      5,
      4,
      6,
      2,
      7,
      8,
      9,
      1
    ],
    [
      5,
      7,
      1,
      8,
      3,
      2,
      4,
      6,
      9
    ],
    [
      2,
      3,
      9,
      4,
      6,
      1,
      7,
      8,
      5
    ],
    [
      8,
      4,
      6,
      7,
      9,
      5,
      1,
      3,
      2
    ],
    [
      6,
      8,
      5,
      2,
      7,
      3,
      9,
      1,
      4
    ],
    [
      4,
      2,
      7,
      9,
      1,
      6,
      3,
      5,
      8
    ],
    [
      9,
      1,
      3,
      5,
      4,
      8,
      6,
      2,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 8,
      "col": 0
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
