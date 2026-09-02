export const sudokuData = {
  "board": [
    [
      4,
      7,
      5,
      8,
      9,
      1,
      2,
      3,
      6
    ],
    [
      6,
      3,
      9,
      2,
      4,
      7,
      8,
      5,
      1
    ],
    [
      1,
      2,
      8,
      3,
      6,
      5,
      7,
      4,
      9
    ],
    [
      3,
      4,
      7,
      1,
      5,
      9,
      6,
      8,
      2
    ],
    [
      2,
      9,
      6,
      4,
      7,
      8,
      5,
      1,
      3
    ],
    [
      8,
      5,
      1,
      6,
      2,
      3,
      4,
      9,
      7
    ],
    [
      7,
      1,
      2,
      5,
      3,
      4,
      9,
      6,
      8
    ],
    [
      5,
      6,
      3,
      9,
      8,
      2,
      1,
      7,
      4
    ],
    [
      9,
      8,
      4,
      7,
      1,
      6,
      3,
      2,
      5
    ]
  ],
  "editableCells": [
    {
      "row": 0,
      "col": 2
    },
    {
      "row": 3,
      "col": 4
    },
    {
      "row": 7,
      "col": 5
    },
    {
      "row": 2,
      "col": 5
    },
    {
      "row": 2,
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
