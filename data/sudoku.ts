export const sudokuData = {
  "board": [
    [
      5,
      6,
      3,
      9,
      7,
      2,
      1,
      4,
      8
    ],
    [
      4,
      8,
      2,
      3,
      1,
      5,
      7,
      6,
      9
    ],
    [
      7,
      9,
      1,
      4,
      6,
      8,
      5,
      2,
      3
    ],
    [
      1,
      3,
      4,
      2,
      5,
      9,
      6,
      8,
      7
    ],
    [
      9,
      5,
      7,
      1,
      8,
      6,
      2,
      3,
      4
    ],
    [
      6,
      2,
      8,
      7,
      3,
      4,
      9,
      1,
      5
    ],
    [
      8,
      4,
      6,
      5,
      2,
      7,
      3,
      9,
      1
    ],
    [
      2,
      1,
      5,
      8,
      9,
      3,
      4,
      7,
      6
    ],
    [
      3,
      7,
      9,
      6,
      4,
      1,
      8,
      5,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 8,
      "col": 7
    },
    {
      "row": 1,
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
