export const sudokuData = {
  "board": [
    [
      1,
      9,
      4,
      2,
      6,
      3,
      7,
      8,
      5
    ],
    [
      3,
      5,
      7,
      8,
      4,
      1,
      2,
      6,
      9
    ],
    [
      6,
      2,
      8,
      7,
      9,
      5,
      1,
      4,
      3
    ],
    [
      4,
      3,
      2,
      1,
      7,
      8,
      9,
      5,
      6
    ],
    [
      9,
      8,
      5,
      4,
      2,
      6,
      3,
      7,
      1
    ],
    [
      7,
      6,
      1,
      5,
      3,
      9,
      4,
      2,
      8
    ],
    [
      2,
      1,
      3,
      6,
      5,
      4,
      8,
      9,
      7
    ],
    [
      8,
      4,
      6,
      9,
      1,
      7,
      5,
      3,
      2
    ],
    [
      5,
      7,
      9,
      3,
      8,
      2,
      6,
      1,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 5
    },
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 3,
      "col": 1
    },
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 0,
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
