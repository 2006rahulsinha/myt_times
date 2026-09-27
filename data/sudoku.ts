export const sudokuData = {
  "board": [
    [
      8,
      3,
      7,
      2,
      4,
      5,
      6,
      9,
      1
    ],
    [
      2,
      9,
      6,
      1,
      8,
      3,
      4,
      5,
      7
    ],
    [
      5,
      1,
      4,
      6,
      9,
      7,
      8,
      3,
      2
    ],
    [
      4,
      5,
      8,
      7,
      2,
      1,
      9,
      6,
      3
    ],
    [
      1,
      6,
      2,
      3,
      5,
      9,
      7,
      4,
      8
    ],
    [
      3,
      7,
      9,
      8,
      6,
      4,
      1,
      2,
      5
    ],
    [
      6,
      8,
      3,
      9,
      7,
      2,
      5,
      1,
      4
    ],
    [
      9,
      4,
      1,
      5,
      3,
      8,
      2,
      7,
      6
    ],
    [
      7,
      2,
      5,
      4,
      1,
      6,
      3,
      8,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 8,
      "col": 2
    },
    {
      "row": 0,
      "col": 4
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
