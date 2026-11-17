export const sudokuData = {
  "board": [
    [
      6,
      8,
      9,
      1,
      3,
      2,
      4,
      7,
      5
    ],
    [
      1,
      2,
      7,
      5,
      6,
      4,
      9,
      3,
      8
    ],
    [
      3,
      4,
      5,
      7,
      8,
      9,
      6,
      1,
      2
    ],
    [
      5,
      9,
      1,
      4,
      2,
      6,
      7,
      8,
      3
    ],
    [
      4,
      6,
      3,
      8,
      7,
      1,
      5,
      2,
      9
    ],
    [
      2,
      7,
      8,
      3,
      9,
      5,
      1,
      4,
      6
    ],
    [
      9,
      1,
      6,
      2,
      4,
      3,
      8,
      5,
      7
    ],
    [
      8,
      5,
      2,
      9,
      1,
      7,
      3,
      6,
      4
    ],
    [
      7,
      3,
      4,
      6,
      5,
      8,
      2,
      9,
      1
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 0
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 3,
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
