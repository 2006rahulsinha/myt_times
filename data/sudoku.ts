export const sudokuData = {
  "board": [
    [
      6,
      7,
      5,
      2,
      1,
      9,
      4,
      8,
      3
    ],
    [
      4,
      3,
      2,
      8,
      5,
      6,
      9,
      1,
      7
    ],
    [
      1,
      9,
      8,
      7,
      4,
      3,
      6,
      2,
      5
    ],
    [
      7,
      1,
      3,
      5,
      2,
      4,
      8,
      6,
      9
    ],
    [
      8,
      5,
      4,
      6,
      9,
      7,
      1,
      3,
      2
    ],
    [
      2,
      6,
      9,
      1,
      3,
      8,
      5,
      7,
      4
    ],
    [
      3,
      4,
      6,
      9,
      8,
      2,
      7,
      5,
      1
    ],
    [
      9,
      8,
      1,
      3,
      7,
      5,
      2,
      4,
      6
    ],
    [
      5,
      2,
      7,
      4,
      6,
      1,
      3,
      9,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 8,
      "col": 8
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 2,
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
