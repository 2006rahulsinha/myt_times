export const sudokuData = {
  "board": [
    [
      6,
      8,
      4,
      5,
      9,
      2,
      3,
      1,
      7
    ],
    [
      1,
      5,
      9,
      4,
      7,
      3,
      6,
      2,
      8
    ],
    [
      7,
      3,
      2,
      6,
      8,
      1,
      9,
      4,
      5
    ],
    [
      3,
      2,
      7,
      9,
      1,
      4,
      5,
      8,
      6
    ],
    [
      5,
      6,
      1,
      7,
      3,
      8,
      4,
      9,
      2
    ],
    [
      9,
      4,
      8,
      2,
      5,
      6,
      7,
      3,
      1
    ],
    [
      2,
      9,
      6,
      1,
      4,
      5,
      8,
      7,
      3
    ],
    [
      8,
      7,
      5,
      3,
      2,
      9,
      1,
      6,
      4
    ],
    [
      4,
      1,
      3,
      8,
      6,
      7,
      2,
      5,
      9
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 1
    },
    {
      "row": 3,
      "col": 7
    },
    {
      "row": 8,
      "col": 5
    },
    {
      "row": 7,
      "col": 7
    },
    {
      "row": 8,
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
