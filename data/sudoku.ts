export const sudokuData = {
  "board": [
    [
      3,
      4,
      9,
      8,
      6,
      5,
      7,
      1,
      2
    ],
    [
      2,
      5,
      8,
      9,
      7,
      1,
      3,
      4,
      6
    ],
    [
      7,
      6,
      1,
      4,
      2,
      3,
      9,
      5,
      8
    ],
    [
      9,
      3,
      2,
      1,
      8,
      7,
      4,
      6,
      5
    ],
    [
      5,
      1,
      7,
      6,
      9,
      4,
      8,
      2,
      3
    ],
    [
      6,
      8,
      4,
      5,
      3,
      2,
      1,
      7,
      9
    ],
    [
      1,
      9,
      6,
      7,
      5,
      8,
      2,
      3,
      4
    ],
    [
      8,
      7,
      3,
      2,
      4,
      6,
      5,
      9,
      1
    ],
    [
      4,
      2,
      5,
      3,
      1,
      9,
      6,
      8,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 3
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 1,
      "col": 1
    },
    {
      "row": 0,
      "col": 7
    },
    {
      "row": 1,
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
