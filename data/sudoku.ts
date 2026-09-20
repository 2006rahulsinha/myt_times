export const sudokuData = {
  "board": [
    [
      9,
      4,
      8,
      1,
      6,
      3,
      5,
      7,
      2
    ],
    [
      6,
      3,
      7,
      5,
      2,
      9,
      1,
      8,
      4
    ],
    [
      5,
      1,
      2,
      4,
      7,
      8,
      3,
      6,
      9
    ],
    [
      8,
      2,
      3,
      6,
      9,
      5,
      4,
      1,
      7
    ],
    [
      7,
      6,
      1,
      2,
      3,
      4,
      9,
      5,
      8
    ],
    [
      4,
      9,
      5,
      7,
      8,
      1,
      6,
      2,
      3
    ],
    [
      1,
      5,
      9,
      8,
      4,
      2,
      7,
      3,
      6
    ],
    [
      3,
      8,
      6,
      9,
      1,
      7,
      2,
      4,
      5
    ],
    [
      2,
      7,
      4,
      3,
      5,
      6,
      8,
      9,
      1
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 2,
      "col": 2
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 8,
      "col": 8
    },
    {
      "row": 2,
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
