export const sudokuData = {
  "board": [
    [
      2,
      4,
      7,
      8,
      1,
      6,
      5,
      9,
      3
    ],
    [
      3,
      1,
      8,
      5,
      7,
      9,
      6,
      4,
      2
    ],
    [
      6,
      5,
      9,
      4,
      3,
      2,
      8,
      7,
      1
    ],
    [
      4,
      7,
      2,
      6,
      8,
      3,
      1,
      5,
      9
    ],
    [
      1,
      6,
      5,
      9,
      4,
      7,
      2,
      3,
      8
    ],
    [
      9,
      8,
      3,
      2,
      5,
      1,
      7,
      6,
      4
    ],
    [
      7,
      9,
      4,
      1,
      6,
      8,
      3,
      2,
      5
    ],
    [
      8,
      2,
      6,
      3,
      9,
      5,
      4,
      1,
      7
    ],
    [
      5,
      3,
      1,
      7,
      2,
      4,
      9,
      8,
      6
    ]
  ],
  "editableCells": [
    {
      "row": 4,
      "col": 4
    },
    {
      "row": 5,
      "col": 0
    },
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 7,
      "col": 4
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
