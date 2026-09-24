export const sudokuData = {
  "board": [
    [
      1,
      3,
      2,
      5,
      7,
      9,
      8,
      4,
      6
    ],
    [
      6,
      4,
      7,
      8,
      3,
      2,
      9,
      5,
      1
    ],
    [
      5,
      8,
      9,
      4,
      1,
      6,
      3,
      2,
      7
    ],
    [
      8,
      2,
      1,
      9,
      6,
      5,
      7,
      3,
      4
    ],
    [
      7,
      9,
      5,
      2,
      4,
      3,
      6,
      1,
      8
    ],
    [
      3,
      6,
      4,
      7,
      8,
      1,
      2,
      9,
      5
    ],
    [
      2,
      5,
      8,
      6,
      9,
      4,
      1,
      7,
      3
    ],
    [
      4,
      7,
      3,
      1,
      2,
      8,
      5,
      6,
      9
    ],
    [
      9,
      1,
      6,
      3,
      5,
      7,
      4,
      8,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 7,
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
