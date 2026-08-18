export const sudokuData = {
  "board": [
    [
      8,
      6,
      3,
      5,
      7,
      4,
      9,
      1,
      2
    ],
    [
      4,
      7,
      1,
      3,
      9,
      2,
      5,
      8,
      6
    ],
    [
      2,
      9,
      5,
      1,
      6,
      8,
      4,
      7,
      3
    ],
    [
      7,
      8,
      6,
      9,
      2,
      5,
      3,
      4,
      1
    ],
    [
      5,
      2,
      9,
      4,
      1,
      3,
      7,
      6,
      8
    ],
    [
      1,
      3,
      4,
      7,
      8,
      6,
      2,
      9,
      5
    ],
    [
      3,
      1,
      2,
      6,
      4,
      7,
      8,
      5,
      9
    ],
    [
      9,
      5,
      7,
      8,
      3,
      1,
      6,
      2,
      4
    ],
    [
      6,
      4,
      8,
      2,
      5,
      9,
      1,
      3,
      7
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 0,
      "col": 0
    },
    {
      "row": 6,
      "col": 3
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
