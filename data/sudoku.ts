export const sudokuData = {
  "board": [
    [
      9,
      7,
      3,
      6,
      5,
      8,
      4,
      2,
      1
    ],
    [
      8,
      2,
      1,
      4,
      9,
      3,
      5,
      6,
      7
    ],
    [
      6,
      5,
      4,
      2,
      1,
      7,
      3,
      9,
      8
    ],
    [
      5,
      8,
      9,
      7,
      6,
      4,
      1,
      3,
      2
    ],
    [
      4,
      3,
      7,
      5,
      2,
      1,
      9,
      8,
      6
    ],
    [
      2,
      1,
      6,
      8,
      3,
      9,
      7,
      5,
      4
    ],
    [
      1,
      4,
      5,
      9,
      8,
      6,
      2,
      7,
      3
    ],
    [
      3,
      6,
      2,
      1,
      7,
      5,
      8,
      4,
      9
    ],
    [
      7,
      9,
      8,
      3,
      4,
      2,
      6,
      1,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 8,
      "col": 3
    },
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 0,
      "col": 6
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
