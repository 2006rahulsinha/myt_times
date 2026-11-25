export const sudokuData = {
  "board": [
    [
      1,
      2,
      4,
      7,
      8,
      5,
      3,
      9,
      6
    ],
    [
      7,
      6,
      5,
      9,
      3,
      1,
      8,
      2,
      4
    ],
    [
      9,
      8,
      3,
      2,
      6,
      4,
      1,
      5,
      7
    ],
    [
      8,
      9,
      1,
      5,
      4,
      2,
      6,
      7,
      3
    ],
    [
      5,
      3,
      2,
      6,
      7,
      8,
      9,
      4,
      1
    ],
    [
      6,
      4,
      7,
      1,
      9,
      3,
      5,
      8,
      2
    ],
    [
      3,
      7,
      9,
      4,
      5,
      6,
      2,
      1,
      8
    ],
    [
      2,
      5,
      8,
      3,
      1,
      7,
      4,
      6,
      9
    ],
    [
      4,
      1,
      6,
      8,
      2,
      9,
      7,
      3,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 8,
      "col": 2
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 6,
      "col": 0
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
