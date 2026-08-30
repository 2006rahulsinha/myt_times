export const sudokuData = {
  "board": [
    [
      2,
      3,
      7,
      1,
      9,
      4,
      8,
      6,
      5
    ],
    [
      5,
      4,
      6,
      3,
      8,
      2,
      1,
      7,
      9
    ],
    [
      8,
      9,
      1,
      5,
      7,
      6,
      4,
      3,
      2
    ],
    [
      6,
      8,
      4,
      2,
      5,
      7,
      9,
      1,
      3
    ],
    [
      3,
      5,
      2,
      6,
      1,
      9,
      7,
      4,
      8
    ],
    [
      7,
      1,
      9,
      4,
      3,
      8,
      2,
      5,
      6
    ],
    [
      1,
      2,
      8,
      7,
      6,
      3,
      5,
      9,
      4
    ],
    [
      9,
      7,
      3,
      8,
      4,
      5,
      6,
      2,
      1
    ],
    [
      4,
      6,
      5,
      9,
      2,
      1,
      3,
      8,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 2
    },
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 1,
      "col": 7
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 2,
      "col": 6
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
