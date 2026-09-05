export const sudokuData = {
  "board": [
    [
      4,
      5,
      6,
      1,
      3,
      9,
      7,
      8,
      2
    ],
    [
      9,
      7,
      3,
      4,
      8,
      2,
      5,
      6,
      1
    ],
    [
      2,
      1,
      8,
      7,
      5,
      6,
      4,
      9,
      3
    ],
    [
      7,
      8,
      2,
      9,
      6,
      3,
      1,
      4,
      5
    ],
    [
      3,
      9,
      5,
      8,
      1,
      4,
      2,
      7,
      6
    ],
    [
      6,
      4,
      1,
      2,
      7,
      5,
      8,
      3,
      9
    ],
    [
      8,
      3,
      9,
      5,
      2,
      7,
      6,
      1,
      4
    ],
    [
      5,
      6,
      7,
      3,
      4,
      1,
      9,
      2,
      8
    ],
    [
      1,
      2,
      4,
      6,
      9,
      8,
      3,
      5,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 5,
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
