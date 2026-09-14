export const sudokuData = {
  "board": [
    [
      2,
      5,
      7,
      1,
      9,
      8,
      4,
      3,
      6
    ],
    [
      3,
      6,
      9,
      7,
      4,
      2,
      8,
      5,
      1
    ],
    [
      4,
      1,
      8,
      5,
      6,
      3,
      7,
      9,
      2
    ],
    [
      9,
      8,
      1,
      4,
      7,
      6,
      5,
      2,
      3
    ],
    [
      7,
      4,
      6,
      3,
      2,
      5,
      1,
      8,
      9
    ],
    [
      5,
      3,
      2,
      8,
      1,
      9,
      6,
      7,
      4
    ],
    [
      8,
      7,
      4,
      9,
      3,
      1,
      2,
      6,
      5
    ],
    [
      6,
      9,
      5,
      2,
      8,
      4,
      3,
      1,
      7
    ],
    [
      1,
      2,
      3,
      6,
      5,
      7,
      9,
      4,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 1
    },
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 5,
      "col": 8
    },
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 4,
      "col": 0
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
