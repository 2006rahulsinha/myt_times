export const sudokuData = {
  "board": [
    [
      2,
      6,
      1,
      7,
      4,
      8,
      5,
      3,
      9
    ],
    [
      9,
      4,
      8,
      5,
      3,
      6,
      7,
      1,
      2
    ],
    [
      5,
      3,
      7,
      1,
      9,
      2,
      8,
      4,
      6
    ],
    [
      7,
      2,
      4,
      9,
      6,
      3,
      1,
      8,
      5
    ],
    [
      6,
      1,
      3,
      4,
      8,
      5,
      2,
      9,
      7
    ],
    [
      8,
      5,
      9,
      2,
      7,
      1,
      4,
      6,
      3
    ],
    [
      1,
      8,
      5,
      3,
      2,
      9,
      6,
      7,
      4
    ],
    [
      3,
      7,
      6,
      8,
      5,
      4,
      9,
      2,
      1
    ],
    [
      4,
      9,
      2,
      6,
      1,
      7,
      3,
      5,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 6,
      "col": 6
    },
    {
      "row": 8,
      "col": 7
    },
    {
      "row": 8,
      "col": 4
    },
    {
      "row": 4,
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
