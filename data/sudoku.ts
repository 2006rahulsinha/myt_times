export const sudokuData = {
  "board": [
    [
      7,
      1,
      5,
      9,
      3,
      2,
      6,
      4,
      8
    ],
    [
      6,
      3,
      4,
      5,
      8,
      7,
      1,
      9,
      2
    ],
    [
      8,
      9,
      2,
      6,
      1,
      4,
      5,
      3,
      7
    ],
    [
      3,
      4,
      1,
      8,
      9,
      5,
      7,
      2,
      6
    ],
    [
      2,
      6,
      7,
      3,
      4,
      1,
      8,
      5,
      9
    ],
    [
      9,
      5,
      8,
      2,
      7,
      6,
      3,
      1,
      4
    ],
    [
      4,
      2,
      6,
      1,
      5,
      8,
      9,
      7,
      3
    ],
    [
      5,
      7,
      3,
      4,
      6,
      9,
      2,
      8,
      1
    ],
    [
      1,
      8,
      9,
      7,
      2,
      3,
      4,
      6,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 3
    },
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 0,
      "col": 3
    },
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 5,
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
