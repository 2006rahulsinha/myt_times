export const sudokuData = {
  "board": [
    [
      3,
      1,
      7,
      9,
      6,
      2,
      5,
      4,
      8
    ],
    [
      4,
      8,
      2,
      5,
      7,
      3,
      1,
      9,
      6
    ],
    [
      5,
      6,
      9,
      4,
      8,
      1,
      7,
      2,
      3
    ],
    [
      2,
      9,
      5,
      8,
      3,
      7,
      4,
      6,
      1
    ],
    [
      1,
      4,
      6,
      2,
      5,
      9,
      3,
      8,
      7
    ],
    [
      7,
      3,
      8,
      6,
      1,
      4,
      9,
      5,
      2
    ],
    [
      6,
      5,
      3,
      7,
      4,
      8,
      2,
      1,
      9
    ],
    [
      8,
      2,
      1,
      3,
      9,
      5,
      6,
      7,
      4
    ],
    [
      9,
      7,
      4,
      1,
      2,
      6,
      8,
      3,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 0,
      "col": 3
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
