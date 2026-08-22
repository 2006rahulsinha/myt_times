export const sudokuData = {
  "board": [
    [
      3,
      5,
      7,
      6,
      8,
      9,
      4,
      1,
      2
    ],
    [
      4,
      8,
      1,
      3,
      5,
      2,
      6,
      9,
      7
    ],
    [
      2,
      6,
      9,
      7,
      4,
      1,
      3,
      8,
      5
    ],
    [
      5,
      2,
      6,
      1,
      3,
      8,
      9,
      7,
      4
    ],
    [
      8,
      7,
      4,
      5,
      9,
      6,
      1,
      2,
      3
    ],
    [
      1,
      9,
      3,
      2,
      7,
      4,
      8,
      5,
      6
    ],
    [
      7,
      1,
      5,
      8,
      6,
      3,
      2,
      4,
      9
    ],
    [
      6,
      4,
      8,
      9,
      2,
      7,
      5,
      3,
      1
    ],
    [
      9,
      3,
      2,
      4,
      1,
      5,
      7,
      6,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 4,
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
