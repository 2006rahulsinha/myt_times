export const sudokuData = {
  "board": [
    [
      8,
      3,
      5,
      4,
      2,
      9,
      6,
      1,
      7
    ],
    [
      2,
      7,
      6,
      8,
      5,
      1,
      9,
      4,
      3
    ],
    [
      1,
      9,
      4,
      6,
      3,
      7,
      2,
      5,
      8
    ],
    [
      7,
      2,
      1,
      3,
      4,
      5,
      8,
      9,
      6
    ],
    [
      9,
      5,
      3,
      1,
      8,
      6,
      4,
      7,
      2
    ],
    [
      4,
      6,
      8,
      7,
      9,
      2,
      1,
      3,
      5
    ],
    [
      5,
      4,
      2,
      9,
      6,
      3,
      7,
      8,
      1
    ],
    [
      6,
      1,
      9,
      5,
      7,
      8,
      3,
      2,
      4
    ],
    [
      3,
      8,
      7,
      2,
      1,
      4,
      5,
      6,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 7,
      "col": 3
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 5,
      "col": 0
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
