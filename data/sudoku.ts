export const sudokuData = {
  "board": [
    [
      7,
      3,
      2,
      1,
      4,
      5,
      8,
      6,
      9
    ],
    [
      6,
      1,
      5,
      3,
      8,
      9,
      2,
      4,
      7
    ],
    [
      9,
      8,
      4,
      7,
      6,
      2,
      1,
      5,
      3
    ],
    [
      4,
      7,
      1,
      6,
      2,
      3,
      9,
      8,
      5
    ],
    [
      3,
      6,
      8,
      5,
      9,
      4,
      7,
      1,
      2
    ],
    [
      2,
      5,
      9,
      8,
      7,
      1,
      4,
      3,
      6
    ],
    [
      8,
      2,
      7,
      4,
      5,
      6,
      3,
      9,
      1
    ],
    [
      5,
      9,
      3,
      2,
      1,
      8,
      6,
      7,
      4
    ],
    [
      1,
      4,
      6,
      9,
      3,
      7,
      5,
      2,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 0,
      "col": 6
    },
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 6,
      "col": 8
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
