export const sudokuData = {
  "board": [
    [
      5,
      1,
      7,
      3,
      9,
      6,
      4,
      8,
      2
    ],
    [
      2,
      4,
      8,
      7,
      5,
      1,
      3,
      9,
      6
    ],
    [
      3,
      6,
      9,
      8,
      2,
      4,
      7,
      5,
      1
    ],
    [
      1,
      8,
      2,
      5,
      3,
      7,
      9,
      6,
      4
    ],
    [
      6,
      7,
      3,
      4,
      1,
      9,
      5,
      2,
      8
    ],
    [
      9,
      5,
      4,
      6,
      8,
      2,
      1,
      7,
      3
    ],
    [
      4,
      3,
      5,
      9,
      6,
      8,
      2,
      1,
      7
    ],
    [
      8,
      9,
      1,
      2,
      7,
      3,
      6,
      4,
      5
    ],
    [
      7,
      2,
      6,
      1,
      4,
      5,
      8,
      3,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 4,
      "col": 0
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 7,
      "col": 6
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
