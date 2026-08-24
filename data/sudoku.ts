export const sudokuData = {
  "board": [
    [
      8,
      6,
      3,
      2,
      1,
      7,
      5,
      9,
      4
    ],
    [
      4,
      7,
      1,
      6,
      5,
      9,
      3,
      8,
      2
    ],
    [
      5,
      2,
      9,
      8,
      4,
      3,
      7,
      1,
      6
    ],
    [
      6,
      1,
      4,
      3,
      8,
      2,
      9,
      7,
      5
    ],
    [
      3,
      8,
      2,
      9,
      7,
      5,
      6,
      4,
      1
    ],
    [
      9,
      5,
      7,
      1,
      6,
      4,
      8,
      2,
      3
    ],
    [
      2,
      3,
      8,
      4,
      9,
      6,
      1,
      5,
      7
    ],
    [
      1,
      4,
      5,
      7,
      3,
      8,
      2,
      6,
      9
    ],
    [
      7,
      9,
      6,
      5,
      2,
      1,
      4,
      3,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 1,
      "col": 2
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
