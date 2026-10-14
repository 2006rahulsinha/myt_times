export const sudokuData = {
  "board": [
    [
      6,
      1,
      8,
      9,
      4,
      3,
      5,
      7,
      2
    ],
    [
      3,
      2,
      9,
      8,
      7,
      5,
      6,
      1,
      4
    ],
    [
      4,
      5,
      7,
      1,
      6,
      2,
      3,
      9,
      8
    ],
    [
      5,
      3,
      2,
      6,
      8,
      1,
      7,
      4,
      9
    ],
    [
      8,
      7,
      4,
      5,
      2,
      9,
      1,
      6,
      3
    ],
    [
      9,
      6,
      1,
      7,
      3,
      4,
      2,
      8,
      5
    ],
    [
      2,
      8,
      6,
      3,
      9,
      7,
      4,
      5,
      1
    ],
    [
      7,
      4,
      5,
      2,
      1,
      8,
      9,
      3,
      6
    ],
    [
      1,
      9,
      3,
      4,
      5,
      6,
      8,
      2,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 8,
      "col": 4
    },
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 7,
      "col": 2
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
