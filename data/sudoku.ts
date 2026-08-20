export const sudokuData = {
  "board": [
    [
      6,
      3,
      7,
      9,
      5,
      1,
      8,
      2,
      4
    ],
    [
      5,
      9,
      1,
      8,
      4,
      2,
      7,
      3,
      6
    ],
    [
      2,
      4,
      8,
      7,
      6,
      3,
      1,
      5,
      9
    ],
    [
      9,
      8,
      5,
      1,
      3,
      6,
      4,
      7,
      2
    ],
    [
      1,
      7,
      3,
      4,
      2,
      8,
      9,
      6,
      5
    ],
    [
      4,
      2,
      6,
      5,
      9,
      7,
      3,
      8,
      1
    ],
    [
      3,
      5,
      4,
      6,
      8,
      9,
      2,
      1,
      7
    ],
    [
      7,
      6,
      2,
      3,
      1,
      4,
      5,
      9,
      8
    ],
    [
      8,
      1,
      9,
      2,
      7,
      5,
      6,
      4,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 1
    },
    {
      "row": 4,
      "col": 7
    },
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 6,
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
