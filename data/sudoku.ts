export const sudokuData = {
  "board": [
    [
      8,
      9,
      1,
      5,
      6,
      2,
      7,
      4,
      3
    ],
    [
      2,
      3,
      5,
      1,
      4,
      7,
      6,
      8,
      9
    ],
    [
      6,
      7,
      4,
      9,
      3,
      8,
      2,
      5,
      1
    ],
    [
      4,
      8,
      9,
      6,
      7,
      5,
      1,
      3,
      2
    ],
    [
      7,
      1,
      3,
      8,
      2,
      4,
      9,
      6,
      5
    ],
    [
      5,
      2,
      6,
      3,
      9,
      1,
      4,
      7,
      8
    ],
    [
      3,
      5,
      7,
      2,
      1,
      6,
      8,
      9,
      4
    ],
    [
      9,
      6,
      2,
      4,
      8,
      3,
      5,
      1,
      7
    ],
    [
      1,
      4,
      8,
      7,
      5,
      9,
      3,
      2,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 1,
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
