export const sudokuData = {
  "board": [
    [
      5,
      1,
      6,
      2,
      7,
      4,
      8,
      3,
      9
    ],
    [
      7,
      2,
      8,
      9,
      5,
      3,
      4,
      1,
      6
    ],
    [
      4,
      3,
      9,
      8,
      1,
      6,
      7,
      5,
      2
    ],
    [
      1,
      9,
      7,
      3,
      8,
      2,
      5,
      6,
      4
    ],
    [
      3,
      5,
      2,
      6,
      4,
      7,
      1,
      9,
      8
    ],
    [
      8,
      6,
      4,
      1,
      9,
      5,
      3,
      2,
      7
    ],
    [
      6,
      7,
      1,
      5,
      2,
      8,
      9,
      4,
      3
    ],
    [
      2,
      4,
      5,
      7,
      3,
      9,
      6,
      8,
      1
    ],
    [
      9,
      8,
      3,
      4,
      6,
      1,
      2,
      7,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 7,
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
