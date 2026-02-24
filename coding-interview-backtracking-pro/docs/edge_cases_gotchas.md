# Backtracking: Edge Cases and Gotchas

Backtracking is powerful, but it comes with its own set of common mistakes and tricky edge cases. Being aware of these can save a lot of debugging time during development and interviews.

## Common Gotchas (Mistakes)

1.  **Forgetting to Backtrack (Undo Choices)**:
    *   **Description**: This is by far the most common mistake. After making a choice and recurring, you *must* undo that choice to explore alternative paths. If you modify a shared state (like adding to a list, changing a board cell, or setting a flag) without restoring it, subsequent recursive calls will see an incorrect state.
    *   **Example (N-Queens)**: If you set `board[row][col] = 'Q'` and mark `colUsed`, `diagUsed` as `true`, but forget to set them back to `.` and `false` after the recursive call returns, future calls will incorrectly think those positions are still occupied.
    *   **Fix**: Always remember the `choice -> recurse -> un-choice` pattern.

2.  **Incorrect Base Cases**:
    *   **Description**: The base case defines when a solution is found or when a path is exhausted. Incorrect base cases can lead to infinite recursion, missing solutions, or generating invalid solutions.
    *   **Example (Combination Sum)**: If `target < 0` is not a base case, the recursion might continue unnecessarily, or if `target == 0` is not handled correctly, you might miss valid empty combinations or terminate too early.
    *   **Fix**: Carefully define the conditions for finding a solution and for pruning an impossible path.

3.  **Inefficient Duplicate Handling (e.g., Combination Sum II)**:
    *   **Description**: When the input array contains duplicates, naive backtracking can produce duplicate *sets* in the result.
    *   **Example**: `candidates = {1,1,2}, target = 2`. Without proper handling, you might get `{1,1}` twice if you don't skip the second '1' properly.
    *   **Fix**:
        *   **Sort the input array**: This brings duplicates together.
        *   **Skip logic**: In the loop, add `if (i > start_index && candidates[i] == candidates[i-1]) continue;` This ensures that if you've already considered a number at `candidates[i-1]`, you don't start a new branch with the identical `candidates[i]` from the *same level* of recursion.

4.  **Off-by-One Errors in Indices**:
    *   **Description**: Using `start_index` or `current_index` incorrectly can lead to infinite loops, out-of-bounds access, or missing choices.
    *   **Example (Permutations)**: Using `i` instead of `i + 1` for the next recursive call when elements are meant to be unique per path (e.g., `i` in Combination Sum I vs `i+1` in Combination Sum II/Subsets).
    *   **Fix**: Double-check loop bounds and index increments for recursive calls. Clearly understand what `start_index` represents.

5.  **Passing by Value vs. Reference**:
    *   **Description**: Modifying a data structure (like `current_combination` or `board`) that is passed by value means changes won't persist up the call stack, leading to incorrect state.
    *   **Example**: If `current_combination` is passed by value, `push_back` and `pop_back` will apply only to the copy, and the parent call's `current_combination` will remain unchanged.
    *   **Fix**: Pass mutable state variables (like `current_combination`, `board`, `used` arrays) by reference (`&`). Pass immutable inputs (like `nums`, `target`) by const reference (`const &`) for efficiency.

## Edge Cases

1.  **Empty Input (`N=0`, `candidates=[]`, `nums=[]`)**:
    *   **N-Queens**: `solveNQueens(0)` should return an empty list of solutions.
    *   **Sudoku Solver**: An empty board `board.empty()` or `board[0].empty()` should be handled gracefully (e.g., return immediately). A 9x9 board with all '.' should be solvable (if allowed).
    *   **Combination Sum II**: `combinationSum2({}, target)` should return an empty list. `combinationSum2({1,2,3}, 0)` should return `{{}}` (the empty combination sums to 0).
    *   **Permutations**: `permute({})` should return an empty list.

2.  **Single Element Input (`N=1`, `candidates={5}`, `nums={7}`)**:
    *   **N-Queens (N=1)**: Should return one solution: `{"Q"}`.
    *   **Sudoku Solver**: A 9x9 board with only one cell empty.
    *   **Combination Sum II**: `candidates={5}, target=5` should return `{{5}}`. `candidates={5}, target=6` should return `{}`.
    *   **Permutations**: `permute({7})` should return `{{7}}`.

3.  **Target Value of Zero (Combination Sum II)**:
    *   If `target == 0` is allowed, the empty combination `[]` is usually a valid solution. Make sure your base case handles this correctly.

4.  **No Solution Possible**:
    *   **N-Queens (N=2, N=3)**: Should return an empty list of solutions.
    *   **Sudoku Solver**: An unsolvable Sudoku board. Your function should gracefully return `false` from `backtrack` and leave the board in its initial state (or the state when `solveSudoku` was called).
    *   **Combination Sum II**: `candidates={2}, target=3` should return `{}`.
    *   **Permutations**: Not applicable for distinct elements, as permutations always exist for non-empty sets.

5.  **All Elements Used (Permutations)**:
    *   When all `N` elements have been placed in `current_permutation`, ensure it's added to `result` and the recursion stops.

6.  **Full Board/Input (Sudoku)**:
    *   If the initial Sudoku board is already completely filled and valid, the solver should immediately return true without making any changes.

By keeping these common pitfalls and edge cases in mind, you can write more robust and correct backtracking algorithms. Remember to test thoroughly with various inputs, including these edge cases.

---