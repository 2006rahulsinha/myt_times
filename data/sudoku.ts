export const sudokuData = {
  "board": [
    [
      3,
      5,
      7,
      8,
      2,
      6,
      9,
      4,
      1
    ],
    [
      6,
      2,
      4,
      1,
      9,
      7,
      8,
      5,
      3
    ],
    [
      1,
      9,
      8,
      5,
      4,
      3,
      6,
      7,
      2
    ],
    [
      4,
      8,
      5,
      2,
      1,
      9,
      7,
      3,
      6
    ],
    [
      2,
      7,
      1,
      6,
      3,
      8,
      4,
      9,
      5
    ],
    [
      9,
      6,
      3,
      7,
      5,
      4,
      2,
      1,
      8
    ],
    [
      8,
      1,
      9,
      3,
      7,
      2,
      5,
      6,
      4
    ],
    [
      5,
      4,
      6,
      9,
      8,
      1,
      3,
      2,
      7
    ],
    [
      7,
      3,
      2,
      4,
      6,
      5,
      1,
      8,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 5,
      "col": 1
    },
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 0,
      "col": 8
    },
    {
      "row": 7,
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
