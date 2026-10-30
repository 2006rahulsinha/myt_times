export const sudokuData = {
  "board": [
    [
      4,
      3,
      6,
      2,
      1,
      8,
      9,
      7,
      5
    ],
    [
      7,
      9,
      1,
      5,
      3,
      4,
      2,
      8,
      6
    ],
    [
      5,
      8,
      2,
      6,
      9,
      7,
      1,
      4,
      3
    ],
    [
      2,
      4,
      5,
      1,
      7,
      6,
      8,
      3,
      9
    ],
    [
      8,
      6,
      9,
      4,
      5,
      3,
      7,
      2,
      1
    ],
    [
      1,
      7,
      3,
      9,
      8,
      2,
      6,
      5,
      4
    ],
    [
      6,
      5,
      4,
      7,
      2,
      1,
      3,
      9,
      8
    ],
    [
      9,
      2,
      8,
      3,
      6,
      5,
      4,
      1,
      7
    ],
    [
      3,
      1,
      7,
      8,
      4,
      9,
      5,
      6,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 1,
      "col": 6
    },
    {
      "row": 0,
      "col": 5
    },
    {
      "row": 0,
      "col": 8
    },
    {
      "row": 3,
      "col": 8
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
