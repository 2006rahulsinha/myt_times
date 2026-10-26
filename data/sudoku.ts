export const sudokuData = {
  "board": [
    [
      2,
      4,
      7,
      3,
      5,
      9,
      6,
      1,
      8
    ],
    [
      6,
      1,
      3,
      8,
      2,
      7,
      4,
      5,
      9
    ],
    [
      8,
      9,
      5,
      6,
      4,
      1,
      2,
      3,
      7
    ],
    [
      9,
      7,
      6,
      5,
      8,
      2,
      3,
      4,
      1
    ],
    [
      1,
      2,
      8,
      4,
      9,
      3,
      7,
      6,
      5
    ],
    [
      5,
      3,
      4,
      1,
      7,
      6,
      9,
      8,
      2
    ],
    [
      7,
      8,
      1,
      2,
      6,
      4,
      5,
      9,
      3
    ],
    [
      3,
      6,
      9,
      7,
      1,
      5,
      8,
      2,
      4
    ],
    [
      4,
      5,
      2,
      9,
      3,
      8,
      1,
      7,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 4,
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
