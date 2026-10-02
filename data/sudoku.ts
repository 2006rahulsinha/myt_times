export const sudokuData = {
  "board": [
    [
      3,
      5,
      9,
      6,
      2,
      4,
      7,
      8,
      1
    ],
    [
      1,
      4,
      7,
      9,
      8,
      5,
      3,
      6,
      2
    ],
    [
      2,
      8,
      6,
      7,
      3,
      1,
      5,
      9,
      4
    ],
    [
      4,
      2,
      8,
      3,
      6,
      9,
      1,
      7,
      5
    ],
    [
      9,
      7,
      3,
      5,
      1,
      8,
      2,
      4,
      6
    ],
    [
      5,
      6,
      1,
      2,
      4,
      7,
      9,
      3,
      8
    ],
    [
      7,
      1,
      2,
      8,
      9,
      6,
      4,
      5,
      3
    ],
    [
      8,
      3,
      5,
      4,
      7,
      2,
      6,
      1,
      9
    ],
    [
      6,
      9,
      4,
      1,
      5,
      3,
      8,
      2,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 7,
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
