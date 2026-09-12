export const sudokuData = {
  "board": [
    [
      3,
      8,
      6,
      4,
      9,
      1,
      2,
      7,
      5
    ],
    [
      5,
      4,
      7,
      8,
      2,
      6,
      3,
      1,
      9
    ],
    [
      1,
      9,
      2,
      5,
      7,
      3,
      4,
      6,
      8
    ],
    [
      8,
      2,
      1,
      7,
      6,
      4,
      5,
      9,
      3
    ],
    [
      4,
      3,
      9,
      1,
      5,
      8,
      6,
      2,
      7
    ],
    [
      6,
      7,
      5,
      9,
      3,
      2,
      1,
      8,
      4
    ],
    [
      2,
      5,
      4,
      6,
      8,
      7,
      9,
      3,
      1
    ],
    [
      7,
      1,
      3,
      2,
      4,
      9,
      8,
      5,
      6
    ],
    [
      9,
      6,
      8,
      3,
      1,
      5,
      7,
      4,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 1,
      "col": 6
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
