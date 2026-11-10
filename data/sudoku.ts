export const sudokuData = {
  "board": [
    [
      8,
      5,
      9,
      2,
      6,
      3,
      1,
      7,
      4
    ],
    [
      1,
      2,
      3,
      8,
      7,
      4,
      5,
      6,
      9
    ],
    [
      7,
      6,
      4,
      9,
      5,
      1,
      2,
      3,
      8
    ],
    [
      6,
      9,
      1,
      5,
      4,
      8,
      3,
      2,
      7
    ],
    [
      3,
      8,
      5,
      1,
      2,
      7,
      9,
      4,
      6
    ],
    [
      2,
      4,
      7,
      3,
      9,
      6,
      8,
      1,
      5
    ],
    [
      9,
      7,
      2,
      4,
      1,
      5,
      6,
      8,
      3
    ],
    [
      5,
      3,
      6,
      7,
      8,
      2,
      4,
      9,
      1
    ],
    [
      4,
      1,
      8,
      6,
      3,
      9,
      7,
      5,
      2
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 2,
      "col": 0
    },
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 8,
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
