export const sudokuData = {
  "board": [
    [
      7,
      4,
      3,
      6,
      2,
      8,
      5,
      1,
      9
    ],
    [
      5,
      1,
      9,
      7,
      3,
      4,
      2,
      8,
      6
    ],
    [
      8,
      6,
      2,
      9,
      1,
      5,
      3,
      7,
      4
    ],
    [
      4,
      3,
      5,
      1,
      8,
      9,
      6,
      2,
      7
    ],
    [
      9,
      2,
      1,
      4,
      6,
      7,
      8,
      3,
      5
    ],
    [
      6,
      8,
      7,
      2,
      5,
      3,
      4,
      9,
      1
    ],
    [
      3,
      9,
      6,
      8,
      4,
      1,
      7,
      5,
      2
    ],
    [
      2,
      7,
      8,
      5,
      9,
      6,
      1,
      4,
      3
    ],
    [
      1,
      5,
      4,
      3,
      7,
      2,
      9,
      6,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 4
    },
    {
      "row": 3,
      "col": 2
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 4,
      "col": 5
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
