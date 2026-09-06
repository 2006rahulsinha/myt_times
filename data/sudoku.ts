export const sudokuData = {
  "board": [
    [
      9,
      3,
      5,
      1,
      8,
      7,
      4,
      2,
      6
    ],
    [
      6,
      4,
      2,
      5,
      9,
      3,
      1,
      8,
      7
    ],
    [
      1,
      7,
      8,
      2,
      4,
      6,
      3,
      5,
      9
    ],
    [
      2,
      6,
      4,
      7,
      1,
      5,
      8,
      9,
      3
    ],
    [
      5,
      9,
      1,
      4,
      3,
      8,
      6,
      7,
      2
    ],
    [
      3,
      8,
      7,
      6,
      2,
      9,
      5,
      1,
      4
    ],
    [
      8,
      1,
      6,
      9,
      7,
      4,
      2,
      3,
      5
    ],
    [
      7,
      5,
      3,
      8,
      6,
      2,
      9,
      4,
      1
    ],
    [
      4,
      2,
      9,
      3,
      5,
      1,
      7,
      6,
      8
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 7,
      "col": 0
    },
    {
      "row": 1,
      "col": 5
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 1,
      "col": 7
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
