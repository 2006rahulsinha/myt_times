export const sudokuData = {
  "board": [
    [
      1,
      6,
      8,
      9,
      2,
      7,
      3,
      5,
      4
    ],
    [
      2,
      7,
      3,
      4,
      8,
      5,
      9,
      6,
      1
    ],
    [
      4,
      9,
      5,
      3,
      6,
      1,
      8,
      2,
      7
    ],
    [
      3,
      8,
      1,
      7,
      4,
      6,
      5,
      9,
      2
    ],
    [
      7,
      5,
      2,
      1,
      3,
      9,
      6,
      4,
      8
    ],
    [
      9,
      4,
      6,
      2,
      5,
      8,
      1,
      7,
      3
    ],
    [
      5,
      2,
      7,
      8,
      9,
      3,
      4,
      1,
      6
    ],
    [
      8,
      1,
      9,
      6,
      7,
      4,
      2,
      3,
      5
    ],
    [
      6,
      3,
      4,
      5,
      1,
      2,
      7,
      8,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 7,
      "col": 4
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 8,
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
