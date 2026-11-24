export const sudokuData = {
  "board": [
    [
      4,
      2,
      9,
      5,
      3,
      7,
      1,
      8,
      6
    ],
    [
      7,
      6,
      1,
      9,
      8,
      4,
      2,
      3,
      5
    ],
    [
      8,
      3,
      5,
      1,
      2,
      6,
      7,
      4,
      9
    ],
    [
      5,
      7,
      8,
      3,
      9,
      1,
      6,
      2,
      4
    ],
    [
      9,
      1,
      3,
      4,
      6,
      2,
      5,
      7,
      8
    ],
    [
      6,
      4,
      2,
      7,
      5,
      8,
      3,
      9,
      1
    ],
    [
      2,
      9,
      4,
      6,
      7,
      5,
      8,
      1,
      3
    ],
    [
      1,
      5,
      7,
      8,
      4,
      3,
      9,
      6,
      2
    ],
    [
      3,
      8,
      6,
      2,
      1,
      9,
      4,
      5,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 2,
      "col": 8
    },
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 4,
      "col": 6
    },
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 6,
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
