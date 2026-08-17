export const sudokuData = {
  "board": [
    [
      7,
      5,
      1,
      2,
      4,
      8,
      6,
      9,
      3
    ],
    [
      3,
      4,
      6,
      9,
      5,
      1,
      2,
      8,
      7
    ],
    [
      8,
      9,
      2,
      6,
      7,
      3,
      5,
      1,
      4
    ],
    [
      2,
      7,
      4,
      1,
      3,
      9,
      8,
      5,
      6
    ],
    [
      5,
      6,
      8,
      7,
      2,
      4,
      9,
      3,
      1
    ],
    [
      9,
      1,
      3,
      5,
      8,
      6,
      4,
      7,
      2
    ],
    [
      6,
      8,
      5,
      3,
      1,
      2,
      7,
      4,
      9
    ],
    [
      4,
      3,
      9,
      8,
      6,
      7,
      1,
      2,
      5
    ],
    [
      1,
      2,
      7,
      4,
      9,
      5,
      3,
      6,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 8
    },
    {
      "row": 8,
      "col": 6
    },
    {
      "row": 5,
      "col": 2
    },
    {
      "row": 4,
      "col": 5
    },
    {
      "row": 7,
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
