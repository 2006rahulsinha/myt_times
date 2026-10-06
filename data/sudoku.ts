export const sudokuData = {
  "board": [
    [
      5,
      4,
      3,
      9,
      1,
      6,
      8,
      2,
      7
    ],
    [
      1,
      6,
      9,
      7,
      8,
      2,
      3,
      5,
      4
    ],
    [
      8,
      2,
      7,
      3,
      5,
      4,
      9,
      6,
      1
    ],
    [
      9,
      3,
      2,
      1,
      7,
      5,
      4,
      8,
      6
    ],
    [
      6,
      7,
      8,
      4,
      3,
      9,
      2,
      1,
      5
    ],
    [
      4,
      1,
      5,
      6,
      2,
      8,
      7,
      3,
      9
    ],
    [
      3,
      5,
      6,
      8,
      9,
      7,
      1,
      4,
      2
    ],
    [
      2,
      9,
      1,
      5,
      4,
      3,
      6,
      7,
      8
    ],
    [
      7,
      8,
      4,
      2,
      6,
      1,
      5,
      9,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 1
    },
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 4,
      "col": 8
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
