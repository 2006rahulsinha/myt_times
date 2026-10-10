export const sudokuData = {
  "board": [
    [
      5,
      2,
      8,
      7,
      6,
      3,
      4,
      9,
      1
    ],
    [
      9,
      4,
      3,
      2,
      1,
      5,
      8,
      6,
      7
    ],
    [
      7,
      1,
      6,
      8,
      4,
      9,
      3,
      5,
      2
    ],
    [
      4,
      5,
      7,
      3,
      9,
      2,
      1,
      8,
      6
    ],
    [
      3,
      9,
      2,
      6,
      8,
      1,
      5,
      7,
      4
    ],
    [
      6,
      8,
      1,
      5,
      7,
      4,
      9,
      2,
      3
    ],
    [
      1,
      7,
      4,
      9,
      2,
      8,
      6,
      3,
      5
    ],
    [
      2,
      3,
      9,
      1,
      5,
      6,
      7,
      4,
      8
    ],
    [
      8,
      6,
      5,
      4,
      3,
      7,
      2,
      1,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 2
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 3,
      "col": 7
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
