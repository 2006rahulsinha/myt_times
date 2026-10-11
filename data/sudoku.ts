export const sudokuData = {
  "board": [
    [
      4,
      3,
      2,
      1,
      6,
      5,
      7,
      9,
      8
    ],
    [
      6,
      5,
      1,
      8,
      7,
      9,
      3,
      4,
      2
    ],
    [
      8,
      7,
      9,
      3,
      4,
      2,
      1,
      6,
      5
    ],
    [
      2,
      6,
      5,
      9,
      1,
      4,
      8,
      7,
      3
    ],
    [
      1,
      4,
      8,
      7,
      2,
      3,
      6,
      5,
      9
    ],
    [
      7,
      9,
      3,
      5,
      8,
      6,
      4,
      2,
      1
    ],
    [
      5,
      1,
      4,
      6,
      9,
      8,
      2,
      3,
      7
    ],
    [
      9,
      2,
      7,
      4,
      3,
      1,
      5,
      8,
      6
    ],
    [
      3,
      8,
      6,
      2,
      5,
      7,
      9,
      1,
      4
    ]
  ],
  "editableCells": [
    {
      "row": 5,
      "col": 3
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 4,
      "col": 8
    },
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 4,
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
