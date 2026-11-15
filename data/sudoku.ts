export const sudokuData = {
  "board": [
    [
      7,
      5,
      2,
      3,
      6,
      4,
      8,
      1,
      9
    ],
    [
      1,
      4,
      6,
      5,
      9,
      8,
      7,
      3,
      2
    ],
    [
      8,
      9,
      3,
      2,
      7,
      1,
      6,
      4,
      5
    ],
    [
      9,
      6,
      8,
      7,
      2,
      3,
      1,
      5,
      4
    ],
    [
      2,
      7,
      5,
      4,
      1,
      6,
      3,
      9,
      8
    ],
    [
      3,
      1,
      4,
      8,
      5,
      9,
      2,
      7,
      6
    ],
    [
      5,
      3,
      7,
      9,
      8,
      2,
      4,
      6,
      1
    ],
    [
      4,
      8,
      1,
      6,
      3,
      5,
      9,
      2,
      7
    ],
    [
      6,
      2,
      9,
      1,
      4,
      7,
      5,
      8,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 2,
      "col": 7
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 5,
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
