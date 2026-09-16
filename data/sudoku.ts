export const sudokuData = {
  "board": [
    [
      2,
      8,
      3,
      4,
      9,
      1,
      5,
      6,
      7
    ],
    [
      9,
      4,
      7,
      2,
      5,
      6,
      1,
      8,
      3
    ],
    [
      6,
      5,
      1,
      7,
      3,
      8,
      4,
      2,
      9
    ],
    [
      4,
      7,
      2,
      6,
      1,
      5,
      9,
      3,
      8
    ],
    [
      1,
      9,
      6,
      3,
      8,
      2,
      7,
      4,
      5
    ],
    [
      8,
      3,
      5,
      9,
      4,
      7,
      6,
      1,
      2
    ],
    [
      3,
      6,
      4,
      5,
      2,
      9,
      8,
      7,
      1
    ],
    [
      5,
      2,
      8,
      1,
      7,
      4,
      3,
      9,
      6
    ],
    [
      7,
      1,
      9,
      8,
      6,
      3,
      2,
      5,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 1,
      "col": 8
    },
    {
      "row": 8,
      "col": 1
    },
    {
      "row": 1,
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
