export const sudokuData = {
  "board": [
    [
      1,
      8,
      6,
      2,
      9,
      3,
      5,
      4,
      7
    ],
    [
      7,
      4,
      9,
      8,
      5,
      6,
      1,
      2,
      3
    ],
    [
      3,
      2,
      5,
      7,
      1,
      4,
      9,
      6,
      8
    ],
    [
      6,
      9,
      4,
      5,
      8,
      1,
      3,
      7,
      2
    ],
    [
      8,
      1,
      2,
      3,
      6,
      7,
      4,
      5,
      9
    ],
    [
      5,
      7,
      3,
      9,
      4,
      2,
      8,
      1,
      6
    ],
    [
      2,
      6,
      1,
      4,
      3,
      9,
      7,
      8,
      5
    ],
    [
      9,
      5,
      7,
      1,
      2,
      8,
      6,
      3,
      4
    ],
    [
      4,
      3,
      8,
      6,
      7,
      5,
      2,
      9,
      1
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 3,
      "col": 5
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 4,
      "col": 4
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
