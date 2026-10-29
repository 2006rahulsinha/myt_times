export const sudokuData = {
  "board": [
    [
      8,
      6,
      1,
      3,
      4,
      7,
      5,
      2,
      9
    ],
    [
      4,
      3,
      5,
      2,
      1,
      9,
      7,
      8,
      6
    ],
    [
      9,
      7,
      2,
      6,
      8,
      5,
      3,
      4,
      1
    ],
    [
      2,
      5,
      6,
      7,
      9,
      4,
      8,
      1,
      3
    ],
    [
      1,
      8,
      3,
      5,
      6,
      2,
      9,
      7,
      4
    ],
    [
      7,
      4,
      9,
      8,
      3,
      1,
      6,
      5,
      2
    ],
    [
      6,
      1,
      7,
      4,
      5,
      3,
      2,
      9,
      8
    ],
    [
      5,
      9,
      8,
      1,
      2,
      6,
      4,
      3,
      7
    ],
    [
      3,
      2,
      4,
      9,
      7,
      8,
      1,
      6,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 0
    },
    {
      "row": 7,
      "col": 4
    },
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 8,
      "col": 1
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
