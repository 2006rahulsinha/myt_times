export const sudokuData = {
  "board": [
    [
      9,
      4,
      1,
      2,
      3,
      8,
      6,
      5,
      7
    ],
    [
      7,
      3,
      8,
      4,
      6,
      5,
      9,
      1,
      2
    ],
    [
      2,
      5,
      6,
      7,
      9,
      1,
      8,
      4,
      3
    ],
    [
      4,
      6,
      7,
      8,
      5,
      9,
      3,
      2,
      1
    ],
    [
      8,
      2,
      5,
      3,
      1,
      7,
      4,
      6,
      9
    ],
    [
      3,
      1,
      9,
      6,
      4,
      2,
      7,
      8,
      5
    ],
    [
      6,
      9,
      2,
      5,
      8,
      3,
      1,
      7,
      4
    ],
    [
      5,
      8,
      3,
      1,
      7,
      4,
      2,
      9,
      6
    ],
    [
      1,
      7,
      4,
      9,
      2,
      6,
      5,
      3,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 7
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 0,
      "col": 1
    },
    {
      "row": 8,
      "col": 4
    },
    {
      "row": 2,
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
