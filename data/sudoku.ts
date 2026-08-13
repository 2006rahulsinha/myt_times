export const sudokuData = {
  "board": [
    [
      2,
      1,
      5,
      6,
      3,
      9,
      7,
      4,
      8
    ],
    [
      9,
      3,
      4,
      8,
      1,
      7,
      5,
      2,
      6
    ],
    [
      8,
      7,
      6,
      4,
      5,
      2,
      1,
      3,
      9
    ],
    [
      4,
      9,
      3,
      1,
      7,
      5,
      6,
      8,
      2
    ],
    [
      6,
      2,
      7,
      3,
      9,
      8,
      4,
      5,
      1
    ],
    [
      1,
      5,
      8,
      2,
      4,
      6,
      3,
      9,
      7
    ],
    [
      3,
      4,
      2,
      9,
      6,
      1,
      8,
      7,
      5
    ],
    [
      7,
      8,
      1,
      5,
      2,
      4,
      9,
      6,
      3
    ],
    [
      5,
      6,
      9,
      7,
      8,
      3,
      2,
      1,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 3,
      "col": 6
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 0,
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
