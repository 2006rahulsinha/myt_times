export const sudokuData = {
  "board": [
    [
      2,
      5,
      9,
      8,
      1,
      4,
      7,
      6,
      3
    ],
    [
      8,
      1,
      4,
      3,
      6,
      7,
      2,
      5,
      9
    ],
    [
      7,
      3,
      6,
      9,
      2,
      5,
      8,
      1,
      4
    ],
    [
      4,
      8,
      7,
      1,
      3,
      6,
      5,
      9,
      2
    ],
    [
      1,
      6,
      2,
      7,
      5,
      9,
      3,
      4,
      8
    ],
    [
      3,
      9,
      5,
      2,
      4,
      8,
      6,
      7,
      1
    ],
    [
      9,
      2,
      3,
      5,
      7,
      1,
      4,
      8,
      6
    ],
    [
      6,
      7,
      1,
      4,
      8,
      2,
      9,
      3,
      5
    ],
    [
      5,
      4,
      8,
      6,
      9,
      3,
      1,
      2,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 3,
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
