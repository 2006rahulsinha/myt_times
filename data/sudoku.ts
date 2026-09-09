export const sudokuData = {
  "board": [
    [
      2,
      9,
      6,
      5,
      1,
      3,
      4,
      8,
      7
    ],
    [
      4,
      8,
      1,
      7,
      9,
      2,
      6,
      5,
      3
    ],
    [
      7,
      5,
      3,
      8,
      6,
      4,
      2,
      1,
      9
    ],
    [
      8,
      6,
      7,
      3,
      4,
      5,
      1,
      9,
      2
    ],
    [
      9,
      3,
      4,
      6,
      2,
      1,
      8,
      7,
      5
    ],
    [
      5,
      1,
      2,
      9,
      7,
      8,
      3,
      4,
      6
    ],
    [
      1,
      2,
      9,
      4,
      5,
      6,
      7,
      3,
      8
    ],
    [
      3,
      4,
      5,
      2,
      8,
      7,
      9,
      6,
      1
    ],
    [
      6,
      7,
      8,
      1,
      3,
      9,
      5,
      2,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 4,
      "col": 3
    },
    {
      "row": 2,
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
