# Visual Diagrams for Backtracking

This document provides ASCII art visualizations to illustrate the backtracking process for some common problems.

## 1. N-Queens (N=4)

The N-Queens problem aims to place N non-attacking queens on an N×N chessboard. For N=4, there are 2 solutions.

Let's visualize the search for the first few steps:

-   `Q` represents a queen.
-   `.` represents an empty square.
-   `X` represents a square that cannot host a queen due to an attack from a previously placed queen.

Initial state (empty board):
```
....
....
....
....
```

### Step 1: Place Queen in Row 0

Try `(0,0)`:
```
Q...
....
....
....
```
Possible moves for next queen (Row 1): `(1,0)` (col conflict), `(1,1)` (diag conflict), `(1,2)`, `(1,3)`.
Only `(1,2)` or `(1,3)` are safe. Let's try `(1,1)` (which is actually `(1,2)` after checks).

```
Q...
..Q.   (Placed at (1,2))
....
....
```
Possible moves for next queen (Row 2):
`(2,0)` safe, `(2,1)` (diag conflict), `(2,2)` (col conflict), `(2,3)` (diag conflict)
Try `(2,0)`:
```
Q...
..Q.
Q...   (Placed at (2,0))
....
```
Possible moves for next queen (Row 3):
`(3,0)` (col conflict), `(3,1)` safe, `(3,2)` (diag conflict), `(3,3)` (diag conflict).
Try `(3,1)`:
```
Q...
..Q.
Q...
.Q..   (Placed at (3,1))
```
**Constraint Check**: Queen at (3,1) conflicts with Queen at (1,2) diagonally! This path is invalid.
**BACKTRACK!** Remove queen from (3,1).

```
Q...
..Q.
Q...
....
```
No more safe spots in Row 3 if Q at (2,0).
**BACKTRACK!** Remove queen from (2,0).

```
Q...
..Q.
....
....
```
No more safe spots in Row 2 if Q at (1,2).
**BACKTRACK!** Remove queen from (1,2).

```
Q...
....
....
....
```
Try `(1,3)` for row 1:
```
Q...
...Q   (Placed at (1,3))
....
....
```
Possible moves for next queen (Row 2):
`(2,0)` safe, `(2,1)` safe, `(2,2)` (diag conflict), `(2,3)` (col conflict).
Try `(2,1)`:
```
Q...
...Q
.Q..   (Placed at (2,1))
....
```
Possible moves for next queen (Row 3):
`(3,0)` safe, `(3,1)` (col conflict), `(3,2)` (diag conflict), `(3,3)` (diag conflict).
Try `(3,0)`:
```
Q...
...Q
.Q..
Q...   (Placed at (3,0))
```
**FOUND SOLUTION 1!**
```
.Q..
...Q
Q...
..Q.
```
*(The order in which solutions are found depends on the specific iteration order in the code. My hand trace above found a solution starting with Q at (0,0) and (1,3), which results in `Q... / ...Q / .Q.. / ..Q.`. This might not be the exact output order but is a valid solution.)*

After finding a solution, the algorithm will continue to **backtrack**:
Remove Q from (3,0). Try other options in row 3 (none).
Remove Q from (2,1). Try other options in row 2 (none, as (2,0) would conflict with (0,0) etc.).
This eventually leads to exploring other choices from the initial state, e.g., placing the first queen at `(0,1)`, which leads to the other solution for N=4:

```
.Q..
...Q
Q...
..Q.
```

## 2. Sudoku Solver (Simplified 4x4 Example)

Let's consider a smaller 4x4 Sudoku board for visualization. Rules are similar: 1-4 once per row, col, 2x2 subgrid.

Initial Board:
```
+---+---+
| 1 | . |
|---+---|
| . | 4 |
+---+---+
```
Represented as:
```
{{'1', '.'}, {'.', '4'}}
```

Empty cells are `(0,1)` and `(1,0)`.

### Backtracking Process:

1.  **Find first empty cell:** `(0,1)`
    *   Try `num = '1'`: `is_valid((0,1), '1')` -> `false` (row 0 already has '1')
    *   Try `num = '2'`: `is_valid((0,1), '2')` -> `true`
        *   **Choice:** Place '2' at `(0,1)`. Board is now `{{'1', '2'}, {'.', '4'}}`
        *   **Recurse:** `backtrack_sudoku(board)`
            *   **Find next empty cell:** `(1,0)`
            *   Try `num = '1'`: `is_valid((1,0), '1')` -> `false` (col 0 already has '1')
            *   Try `num = '2'`: `is_valid((1,0), '2')` -> `false` (subgrid 0,0 has '2')
            *   Try `num = '3'`: `is_valid((1,0), '3')` -> `true`
                *   **Choice:** Place '3' at `(1,0)`. Board is now `{{'1', '2'}, {'3', '4'}}`
                *   **Recurse:** `backtrack_sudoku(board)`
                    *   **No empty cells.**
                    *   **Base Case:** Board is full and valid. Return `true`.
                *   Return `true` to caller.
            *   Return `true` to caller.
        *   Return `true` to caller.
    *   **Solution Found!** `{{'1', '2'}, {'3', '4'}}`

```
Call Stack Visualization:

solveSudoku({{1,.},{.,4}})
  backtrack_sudoku({{1,.},{.,4}})
    findEmpty() -> (0,1)
    try '1': invalid (row 0)
    try '2': valid
      board[0][1] = '2' -> {{1,2},{.,4}}
      backtrack_sudoku({{1,2},{.,4}})
        findEmpty() -> (1,0)
        try '1': invalid (col 0)
        try '2': invalid (subgrid)
        try '3': valid
          board[1][0] = '3' -> {{1,2},{3,4}}
          backtrack_sudoku({{1,2},{3,4}})
            findEmpty() -> no empty cells
            return true (Base Case: solved!)
          return true (propagate solution)
        return true (propagate solution)
      return true (propagate solution)
```

The tree search terminates very quickly in this small example due to the effectiveness of pruning at each step (`is_valid`). For larger, harder Sudoku puzzles, many more branches would be explored and pruned before finding the unique solution.

These diagrams highlight the recursive nature of making a choice, exploring its consequences, and then undoing that choice (backtracking) to explore alternatives.