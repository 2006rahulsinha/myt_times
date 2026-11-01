export const sudokuData = {
  "board": [
    [
      7,
      6,
      1,
      3,
      9,
      5,
      2,
      8,
      4
    ],
    [
      5,
      3,
      2,
      6,
      4,
      8,
      9,
      7,
      1
    ],
    [
      8,
      4,
      9,
      1,
      7,
      2,
      3,
      6,
      5
    ],
    [
      4,
      1,
      6,
      2,
      5,
      3,
      8,
      9,
      7
    ],
    [
      2,
      5,
      7,
      4,
      8,
      9,
      1,
      3,
      6
    ],
    [
      3,
      9,
      8,
      7,
      1,
      6,
      4,
      5,
      2
    ],
    [
      9,
      2,
      3,
      5,
      6,
      4,
      7,
      1,
      8
    ],
    [
      6,
      7,
      4,
      8,
      3,
      1,
      5,
      2,
      9
    ],
    [
      1,
      8,
      5,
      9,
      2,
      7,
      6,
      4,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 1,
      "col": 4
    },
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 1,
      "col": 3
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 5,
      "col": 3
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
