export const sudokuData = {
  "board": [
    [
      2,
      9,
      1,
      6,
      4,
      5,
      7,
      3,
      8
    ],
    [
      4,
      8,
      3,
      2,
      1,
      7,
      5,
      9,
      6
    ],
    [
      7,
      6,
      5,
      9,
      3,
      8,
      2,
      4,
      1
    ],
    [
      8,
      3,
      9,
      1,
      6,
      2,
      4,
      5,
      7
    ],
    [
      1,
      7,
      6,
      5,
      9,
      4,
      8,
      2,
      3
    ],
    [
      5,
      4,
      2,
      7,
      8,
      3,
      6,
      1,
      9
    ],
    [
      9,
      5,
      8,
      3,
      2,
      6,
      1,
      7,
      4
    ],
    [
      6,
      1,
      7,
      4,
      5,
      9,
      3,
      8,
      2
    ],
    [
      3,
      2,
      4,
      8,
      7,
      1,
      9,
      6,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 0,
      "col": 6
    },
    {
      "row": 8,
      "col": 7
    },
    {
      "row": 6,
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
