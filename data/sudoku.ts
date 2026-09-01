export const sudokuData = {
  "board": [
    [
      6,
      4,
      8,
      3,
      7,
      9,
      2,
      5,
      1
    ],
    [
      1,
      2,
      7,
      5,
      4,
      6,
      8,
      9,
      3
    ],
    [
      9,
      5,
      3,
      8,
      2,
      1,
      4,
      7,
      6
    ],
    [
      3,
      7,
      1,
      6,
      5,
      4,
      9,
      2,
      8
    ],
    [
      2,
      6,
      5,
      7,
      9,
      8,
      3,
      1,
      4
    ],
    [
      4,
      8,
      9,
      2,
      1,
      3,
      7,
      6,
      5
    ],
    [
      5,
      1,
      2,
      4,
      3,
      7,
      6,
      8,
      9
    ],
    [
      7,
      3,
      6,
      9,
      8,
      5,
      1,
      4,
      2
    ],
    [
      8,
      9,
      4,
      1,
      6,
      2,
      5,
      3,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 1,
      "col": 2
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 5,
      "col": 6
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
