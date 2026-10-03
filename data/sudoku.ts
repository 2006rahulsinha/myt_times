export const sudokuData = {
  "board": [
    [
      3,
      7,
      5,
      8,
      1,
      9,
      4,
      2,
      6
    ],
    [
      2,
      1,
      6,
      3,
      7,
      4,
      5,
      8,
      9
    ],
    [
      8,
      4,
      9,
      2,
      6,
      5,
      1,
      3,
      7
    ],
    [
      4,
      8,
      2,
      7,
      3,
      1,
      9,
      6,
      5
    ],
    [
      9,
      3,
      7,
      5,
      4,
      6,
      8,
      1,
      2
    ],
    [
      6,
      5,
      1,
      9,
      2,
      8,
      3,
      7,
      4
    ],
    [
      5,
      6,
      3,
      1,
      9,
      2,
      7,
      4,
      8
    ],
    [
      7,
      9,
      4,
      6,
      8,
      3,
      2,
      5,
      1
    ],
    [
      1,
      2,
      8,
      4,
      5,
      7,
      6,
      9,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 4,
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
