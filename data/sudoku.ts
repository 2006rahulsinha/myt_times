export const sudokuData = {
  "board": [
    [
      9,
      8,
      3,
      7,
      1,
      6,
      4,
      5,
      2
    ],
    [
      2,
      4,
      5,
      3,
      8,
      9,
      6,
      7,
      1
    ],
    [
      7,
      1,
      6,
      5,
      4,
      2,
      3,
      8,
      9
    ],
    [
      5,
      2,
      8,
      4,
      6,
      3,
      1,
      9,
      7
    ],
    [
      6,
      3,
      9,
      8,
      7,
      1,
      5,
      2,
      4
    ],
    [
      1,
      7,
      4,
      9,
      2,
      5,
      8,
      3,
      6
    ],
    [
      3,
      6,
      7,
      2,
      5,
      4,
      9,
      1,
      8
    ],
    [
      8,
      5,
      1,
      6,
      9,
      7,
      2,
      4,
      3
    ],
    [
      4,
      9,
      2,
      1,
      3,
      8,
      7,
      6,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 3,
      "col": 3
    },
    {
      "row": 2,
      "col": 3
    },
    {
      "row": 8,
      "col": 4
    },
    {
      "row": 5,
      "col": 2
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
