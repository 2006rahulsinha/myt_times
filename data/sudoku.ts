export const sudokuData = {
  "board": [
    [
      8,
      4,
      5,
      7,
      3,
      2,
      1,
      9,
      6
    ],
    [
      2,
      6,
      1,
      5,
      9,
      8,
      3,
      4,
      7
    ],
    [
      3,
      7,
      9,
      4,
      1,
      6,
      8,
      2,
      5
    ],
    [
      7,
      5,
      3,
      8,
      2,
      9,
      4,
      6,
      1
    ],
    [
      4,
      1,
      2,
      6,
      5,
      7,
      9,
      3,
      8
    ],
    [
      9,
      8,
      6,
      1,
      4,
      3,
      5,
      7,
      2
    ],
    [
      6,
      9,
      8,
      3,
      7,
      5,
      2,
      1,
      4
    ],
    [
      5,
      2,
      4,
      9,
      6,
      1,
      7,
      8,
      3
    ],
    [
      1,
      3,
      7,
      2,
      8,
      4,
      6,
      5,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 2
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 6,
      "col": 0
    },
    {
      "row": 5,
      "col": 8
    },
    {
      "row": 0,
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
