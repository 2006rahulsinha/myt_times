export const sudokuData = {
  "board": [
    [
      4,
      9,
      7,
      6,
      3,
      5,
      8,
      2,
      1
    ],
    [
      2,
      3,
      5,
      9,
      8,
      1,
      4,
      7,
      6
    ],
    [
      6,
      1,
      8,
      4,
      2,
      7,
      5,
      9,
      3
    ],
    [
      1,
      8,
      3,
      7,
      6,
      9,
      2,
      5,
      4
    ],
    [
      5,
      4,
      6,
      2,
      1,
      8,
      9,
      3,
      7
    ],
    [
      9,
      7,
      2,
      5,
      4,
      3,
      1,
      6,
      8
    ],
    [
      8,
      2,
      4,
      3,
      5,
      6,
      7,
      1,
      9
    ],
    [
      3,
      5,
      9,
      1,
      7,
      4,
      6,
      8,
      2
    ],
    [
      7,
      6,
      1,
      8,
      9,
      2,
      3,
      4,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 7,
      "col": 8
    },
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 5,
      "col": 4
    },
    {
      "row": 8,
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
