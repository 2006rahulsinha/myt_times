export const sudokuData = {
  "board": [
    [
      6,
      5,
      7,
      9,
      2,
      1,
      4,
      3,
      8
    ],
    [
      3,
      1,
      8,
      6,
      4,
      5,
      9,
      7,
      2
    ],
    [
      2,
      4,
      9,
      8,
      7,
      3,
      1,
      6,
      5
    ],
    [
      4,
      2,
      1,
      7,
      6,
      9,
      5,
      8,
      3
    ],
    [
      9,
      6,
      3,
      2,
      5,
      8,
      7,
      1,
      4
    ],
    [
      7,
      8,
      5,
      3,
      1,
      4,
      6,
      2,
      9
    ],
    [
      1,
      9,
      2,
      5,
      8,
      6,
      3,
      4,
      7
    ],
    [
      8,
      3,
      4,
      1,
      9,
      7,
      2,
      5,
      6
    ],
    [
      5,
      7,
      6,
      4,
      3,
      2,
      8,
      9,
      1
    ]
  ],
  "editableCells": [
    {
      "row": 8,
      "col": 2
    },
    {
      "row": 5,
      "col": 7
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 5,
      "col": 8
    },
    {
      "row": 7,
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
