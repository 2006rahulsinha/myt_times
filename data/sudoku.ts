export const sudokuData = {
  "board": [
    [
      9,
      1,
      2,
      3,
      4,
      6,
      8,
      5,
      7
    ],
    [
      7,
      5,
      4,
      8,
      1,
      2,
      6,
      3,
      9
    ],
    [
      3,
      8,
      6,
      7,
      5,
      9,
      2,
      4,
      1
    ],
    [
      4,
      2,
      5,
      1,
      3,
      8,
      9,
      7,
      6
    ],
    [
      6,
      7,
      8,
      5,
      9,
      4,
      3,
      1,
      2
    ],
    [
      1,
      3,
      9,
      2,
      6,
      7,
      4,
      8,
      5
    ],
    [
      2,
      4,
      7,
      9,
      8,
      1,
      5,
      6,
      3
    ],
    [
      8,
      9,
      3,
      6,
      7,
      5,
      1,
      2,
      4
    ],
    [
      5,
      6,
      1,
      4,
      2,
      3,
      7,
      9,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 6,
      "col": 0
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 4,
      "col": 4
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
