export const sudokuData = {
  "board": [
    [
      8,
      6,
      7,
      3,
      4,
      2,
      5,
      1,
      9
    ],
    [
      1,
      3,
      2,
      6,
      5,
      9,
      7,
      4,
      8
    ],
    [
      9,
      5,
      4,
      8,
      7,
      1,
      6,
      3,
      2
    ],
    [
      3,
      2,
      5,
      4,
      6,
      8,
      1,
      9,
      7
    ],
    [
      4,
      9,
      8,
      5,
      1,
      7,
      2,
      6,
      3
    ],
    [
      6,
      7,
      1,
      9,
      2,
      3,
      8,
      5,
      4
    ],
    [
      2,
      4,
      9,
      1,
      8,
      5,
      3,
      7,
      6
    ],
    [
      5,
      8,
      6,
      7,
      3,
      4,
      9,
      2,
      1
    ],
    [
      7,
      1,
      3,
      2,
      9,
      6,
      4,
      8,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 4
    },
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 7,
      "col": 6
    },
    {
      "row": 6,
      "col": 7
    },
    {
      "row": 8,
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
