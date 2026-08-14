export const sudokuData = {
  "board": [
    [
      2,
      3,
      5,
      6,
      4,
      9,
      7,
      1,
      8
    ],
    [
      9,
      1,
      7,
      5,
      8,
      3,
      4,
      2,
      6
    ],
    [
      4,
      8,
      6,
      1,
      2,
      7,
      3,
      9,
      5
    ],
    [
      6,
      5,
      4,
      2,
      3,
      1,
      8,
      7,
      9
    ],
    [
      3,
      9,
      1,
      7,
      6,
      8,
      2,
      5,
      4
    ],
    [
      7,
      2,
      8,
      9,
      5,
      4,
      6,
      3,
      1
    ],
    [
      5,
      4,
      9,
      3,
      7,
      6,
      1,
      8,
      2
    ],
    [
      1,
      6,
      3,
      8,
      9,
      2,
      5,
      4,
      7
    ],
    [
      8,
      7,
      2,
      4,
      1,
      5,
      9,
      6,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 2
    },
    {
      "row": 0,
      "col": 4
    },
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 5,
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
