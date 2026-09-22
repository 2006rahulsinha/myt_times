export const sudokuData = {
  "board": [
    [
      4,
      2,
      3,
      8,
      5,
      1,
      7,
      9,
      6
    ],
    [
      7,
      1,
      8,
      9,
      4,
      6,
      5,
      2,
      3
    ],
    [
      5,
      9,
      6,
      7,
      2,
      3,
      1,
      4,
      8
    ],
    [
      2,
      3,
      4,
      1,
      9,
      7,
      6,
      8,
      5
    ],
    [
      1,
      5,
      9,
      2,
      6,
      8,
      3,
      7,
      4
    ],
    [
      6,
      8,
      7,
      5,
      3,
      4,
      9,
      1,
      2
    ],
    [
      9,
      7,
      5,
      3,
      8,
      2,
      4,
      6,
      1
    ],
    [
      8,
      6,
      1,
      4,
      7,
      5,
      2,
      3,
      9
    ],
    [
      3,
      4,
      2,
      6,
      1,
      9,
      8,
      5,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 4,
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
