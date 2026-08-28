export const sudokuData = {
  "board": [
    [
      5,
      2,
      9,
      3,
      6,
      7,
      8,
      1,
      4
    ],
    [
      3,
      6,
      1,
      5,
      8,
      4,
      7,
      9,
      2
    ],
    [
      7,
      4,
      8,
      1,
      9,
      2,
      3,
      5,
      6
    ],
    [
      1,
      8,
      6,
      7,
      5,
      9,
      2,
      4,
      3
    ],
    [
      4,
      9,
      5,
      8,
      2,
      3,
      6,
      7,
      1
    ],
    [
      2,
      7,
      3,
      6,
      4,
      1,
      9,
      8,
      5
    ],
    [
      6,
      1,
      2,
      4,
      7,
      8,
      5,
      3,
      9
    ],
    [
      8,
      5,
      4,
      9,
      3,
      6,
      1,
      2,
      7
    ],
    [
      9,
      3,
      7,
      2,
      1,
      5,
      4,
      6,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 4
    },
    {
      "row": 6,
      "col": 2
    },
    {
      "row": 5,
      "col": 5
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 0,
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
