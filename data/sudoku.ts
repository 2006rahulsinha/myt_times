export const sudokuData = {
  "board": [
    [
      7,
      6,
      2,
      3,
      1,
      9,
      4,
      8,
      5
    ],
    [
      9,
      3,
      4,
      5,
      2,
      8,
      7,
      6,
      1
    ],
    [
      1,
      5,
      8,
      7,
      4,
      6,
      9,
      2,
      3
    ],
    [
      2,
      9,
      1,
      8,
      6,
      7,
      3,
      5,
      4
    ],
    [
      6,
      7,
      3,
      9,
      5,
      4,
      8,
      1,
      2
    ],
    [
      8,
      4,
      5,
      1,
      3,
      2,
      6,
      9,
      7
    ],
    [
      5,
      8,
      7,
      4,
      9,
      1,
      2,
      3,
      6
    ],
    [
      4,
      1,
      6,
      2,
      8,
      3,
      5,
      7,
      9
    ],
    [
      3,
      2,
      9,
      6,
      7,
      5,
      1,
      4,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 7,
      "col": 2
    },
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 3,
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
