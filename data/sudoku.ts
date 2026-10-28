export const sudokuData = {
  "board": [
    [
      4,
      9,
      6,
      8,
      1,
      5,
      3,
      7,
      2
    ],
    [
      7,
      1,
      2,
      4,
      6,
      3,
      5,
      9,
      8
    ],
    [
      5,
      3,
      8,
      7,
      2,
      9,
      1,
      4,
      6
    ],
    [
      1,
      5,
      3,
      6,
      9,
      2,
      4,
      8,
      7
    ],
    [
      6,
      7,
      9,
      3,
      8,
      4,
      2,
      5,
      1
    ],
    [
      2,
      8,
      4,
      1,
      5,
      7,
      6,
      3,
      9
    ],
    [
      3,
      6,
      1,
      5,
      7,
      8,
      9,
      2,
      4
    ],
    [
      8,
      2,
      5,
      9,
      4,
      1,
      7,
      6,
      3
    ],
    [
      9,
      4,
      7,
      2,
      3,
      6,
      8,
      1,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 6
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 0,
      "col": 0
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
