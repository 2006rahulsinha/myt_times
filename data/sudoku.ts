export const sudokuData = {
  "board": [
    [
      8,
      9,
      6,
      5,
      4,
      3,
      7,
      2,
      1
    ],
    [
      5,
      1,
      2,
      9,
      7,
      8,
      3,
      6,
      4
    ],
    [
      3,
      7,
      4,
      6,
      1,
      2,
      5,
      9,
      8
    ],
    [
      6,
      4,
      3,
      8,
      9,
      1,
      2,
      5,
      7
    ],
    [
      7,
      2,
      8,
      4,
      3,
      5,
      9,
      1,
      6
    ],
    [
      1,
      5,
      9,
      7,
      2,
      6,
      4,
      8,
      3
    ],
    [
      2,
      3,
      5,
      1,
      6,
      4,
      8,
      7,
      9
    ],
    [
      4,
      6,
      7,
      2,
      8,
      9,
      1,
      3,
      5
    ],
    [
      9,
      8,
      1,
      3,
      5,
      7,
      6,
      4,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 6,
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
