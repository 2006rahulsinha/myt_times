export const sudokuData = {
  "board": [
    [
      4,
      7,
      5,
      2,
      1,
      6,
      3,
      9,
      8
    ],
    [
      8,
      6,
      1,
      4,
      9,
      3,
      2,
      5,
      7
    ],
    [
      2,
      9,
      3,
      5,
      8,
      7,
      4,
      6,
      1
    ],
    [
      7,
      3,
      4,
      1,
      6,
      5,
      8,
      2,
      9
    ],
    [
      1,
      8,
      2,
      9,
      7,
      4,
      6,
      3,
      5
    ],
    [
      6,
      5,
      9,
      3,
      2,
      8,
      7,
      1,
      4
    ],
    [
      3,
      1,
      7,
      8,
      5,
      2,
      9,
      4,
      6
    ],
    [
      9,
      4,
      8,
      6,
      3,
      1,
      5,
      7,
      2
    ],
    [
      5,
      2,
      6,
      7,
      4,
      9,
      1,
      8,
      3
    ]
  ],
  "editableCells": [
    {
      "row": 6,
      "col": 8
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 3,
      "col": 8
    },
    {
      "row": 1,
      "col": 8
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
