export const sudokuData = {
  "board": [
    [
      2,
      5,
      1,
      4,
      6,
      8,
      3,
      9,
      7
    ],
    [
      4,
      7,
      3,
      9,
      5,
      2,
      1,
      6,
      8
    ],
    [
      8,
      9,
      6,
      3,
      1,
      7,
      5,
      4,
      2
    ],
    [
      6,
      1,
      7,
      2,
      9,
      3,
      8,
      5,
      4
    ],
    [
      9,
      2,
      5,
      6,
      8,
      4,
      7,
      1,
      3
    ],
    [
      3,
      8,
      4,
      1,
      7,
      5,
      9,
      2,
      6
    ],
    [
      5,
      6,
      2,
      7,
      3,
      9,
      4,
      8,
      1
    ],
    [
      7,
      4,
      9,
      8,
      2,
      1,
      6,
      3,
      5
    ],
    [
      1,
      3,
      8,
      5,
      4,
      6,
      2,
      7,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 4,
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
