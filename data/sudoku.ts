export const sudokuData = {
  "board": [
    [
      5,
      3,
      2,
      6,
      7,
      9,
      8,
      1,
      4
    ],
    [
      8,
      7,
      4,
      5,
      3,
      1,
      9,
      6,
      2
    ],
    [
      6,
      1,
      9,
      4,
      8,
      2,
      3,
      5,
      7
    ],
    [
      1,
      4,
      5,
      2,
      9,
      7,
      6,
      8,
      3
    ],
    [
      9,
      6,
      7,
      3,
      4,
      8,
      5,
      2,
      1
    ],
    [
      3,
      2,
      8,
      1,
      5,
      6,
      4,
      7,
      9
    ],
    [
      4,
      8,
      1,
      9,
      2,
      5,
      7,
      3,
      6
    ],
    [
      2,
      5,
      3,
      7,
      6,
      4,
      1,
      9,
      8
    ],
    [
      7,
      9,
      6,
      8,
      1,
      3,
      2,
      4,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 2
    },
    {
      "row": 2,
      "col": 6
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 4,
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
