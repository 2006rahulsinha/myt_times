export const sudokuData = {
  "board": [
    [
      9,
      1,
      5,
      8,
      4,
      6,
      3,
      2,
      7
    ],
    [
      8,
      4,
      6,
      7,
      2,
      3,
      5,
      9,
      1
    ],
    [
      7,
      3,
      2,
      1,
      5,
      9,
      4,
      6,
      8
    ],
    [
      6,
      9,
      3,
      2,
      1,
      7,
      8,
      5,
      4
    ],
    [
      5,
      2,
      7,
      3,
      8,
      4,
      9,
      1,
      6
    ],
    [
      1,
      8,
      4,
      6,
      9,
      5,
      2,
      7,
      3
    ],
    [
      4,
      5,
      8,
      9,
      7,
      1,
      6,
      3,
      2
    ],
    [
      2,
      6,
      1,
      5,
      3,
      8,
      7,
      4,
      9
    ],
    [
      3,
      7,
      9,
      4,
      6,
      2,
      1,
      8,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 6,
      "col": 7
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
