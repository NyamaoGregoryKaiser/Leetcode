```markdown
# Edge Cases and Gotchas in Backtracking

Backtracking algorithms, while powerful, can be tricky. Overlooking edge cases or common pitfalls can lead to incorrect solutions, infinite loops, or unexpected performance issues.

## 1. Missing the Backtracking Step (Undo)

*   **Gotcha**: The most common mistake. Forgetting to revert the state after a recursive call.
*   **Symptom**: Incorrect results, results bleeding into other paths, or solutions containing elements from previous failed paths.
*   **Example**:
    ```java
    // Incorrect: Missing path.remove(path.size() - 1);
    void backtrack(List<Integer> path, int[] nums) {
        if (path.size() == nums.length) {
            results.add(new ArrayList<>(path));
            return;
        }
        for (int num : nums) {
            path.add(num);
            backtrack(path, nums);
            // Missing: path.remove(path.size() - 1);
        }
    }
    ```
*   **Fix**: Always explicitly undo any changes made to mutable state (e.g., `List.remove()`, resetting `boolean[]` flags, restoring `char[][]` cell values).

## 2. Incorrect Duplicate Handling

*   **Gotcha**: When the input array contains duplicates and the problem asks for unique combinations/permutations, incorrect duplicate handling can lead to duplicate results or missing valid unique results.
*   **Symptom**: `List<List<Integer>>` containing identical inner lists.
*   **Example (Permutations II):**
    ```java
    // Correct duplicate skip logic for Permutations II (after sorting `nums`)
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        // This line is crucial for skipping duplicate choices at the same level
        if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) {
            continue;
        }
        // ... choose, recurse, unchoose
    }
    ```
*   **Fix**:
    1.  **Always sort the input array first.**
    2.  Implement the duplicate-skipping condition. For *combinations*, it's usually `if (i > start && nums[i] == nums[i-1]) continue;`. For *permutations*, it's `if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue;`. Understand *why* each condition works.

## 3. Infinite Recursion or Stack Overflow

*   **Gotcha**:
    *   Missing a base case (no termination condition).
    *   Not advancing the state properly (e.g., `index` not incremented, `visited` not marked).
    *   Redundant calls without proper pruning.
*   **Symptom**: `StackOverflowError`.
*   **Example (Word Search, missing visited logic):**
    ```java
    // Incorrect: If board[r][c] is not marked visited, it could recurse back to itself immediately.
    boolean dfs(char[][] board, String word, int index, int r, int c) {
        // ... (base cases)
        // char original = board[r][c]; // Correctly storing and restoring
        // board[r][c] = '#'; // Mark as visited (CHOICE)
        // boolean found = dfs(board, word, index+1, r+1, c) || ...
        // board[r][c] = original; // Backtrack (UNCHOOSE)
        // If the 'mark as visited' part is missing, it will recurse infinitely
    }
    ```
*   **Fix**: Ensure all base cases are correctly defined. Verify that the state (especially indices or `visited` status) is always updated to ensure progress towards a base case.

## 4. Off-by-One Errors in Indices or Counts

*   **Gotcha**: Common in array-based problems, ranges, or `n-1` vs `n` issues.
*   **Symptom**: Array index out of bounds, infinite loops, incorrect counts.
*   **Example (N-Queens diagonal indices):**
    *   `row - col` can range from `-(N-1)` to `N-1`. Needs an offset of `N-1` to be `0` to `2N-2`.
    *   `row + col` can range from `0` to `2N-2`.
*   **Fix**: Carefully define ranges and check boundary conditions for loops and array accesses. Use small examples to trace indices.

## 5. Modifying Input Parameters Unexpectedly

*   **Gotcha**: If a backtracking function modifies an input parameter (e.g., a `char[][]` board) and doesn't restore it, subsequent calls in other branches will see the corrupted state.
*   **Symptom**: Solutions for N-Queens might show queens from previous solutions.
*   **Example**: Sudoku solver modifies `board` in-place. If multiple solutions were required (not standard for Sudoku), you'd need to deep copy the board or ensure backtracking is perfect.
*   **Fix**: Always assume mutable parameters need to be restored. If an entire copy of the state is too expensive, use auxiliary data structures that can be easily updated and reverted.

## 6. Incorrect Base Case for Empty Inputs

*   **Gotcha**: For problems involving subsets, permutations, or combinations, empty inputs (`[]` or `n=0`) often have non-obvious base cases.
*   **Symptom**: Empty list when `[[]]` is expected, or vice-versa.
*   **Example**:
    *   `permute([])` should return `[[]]` (one permutation, the empty list).
    *   `combinationSum2(candidates, 0)` should return `[[]]`.
    *   `solveNQueens(0)` should return `[]`.
*   **Fix**: Test with empty inputs or single-element inputs. Clarify with interviewer if necessary.

## 7. Performance: Pruning Opportunities Missed

*   **Gotcha**: Not identifying and implementing early exit conditions can lead to exploring huge parts of the search space unnecessarily, resulting in Time Limit Exceeded (TLE).
*   **Symptom**: Correctness, but TLE on larger inputs.
*   **Example (Combination Sum, sorted input):**
    ```java
    // Correct pruning:
    for (int i = start; i < candidates.length; i++) {
        if (candidates[i] > remainingTarget) { // If sorted, no need to check further
            break; // Pruning step
        }
        // ...
    }
    ```
*   **Fix**: Always consider if the current `current_state` (e.g., `currentSum`, `currentLength`) already violates a condition or makes it impossible to reach a solution.

## 8. Using Global Variables Carelessly

*   **Gotcha**: Using global variables (`static` fields in Java) for things like `currentPath`, `visited` arrays, or `results` list. This can cause state contamination between different calls or test cases.
*   **Symptom**: Tests failing when run together, but passing individually. Wrong results in complex scenarios.
*   **Fix**: Pass necessary state variables as parameters to the recursive function. If a global `List<List<Integer>> results` is used, ensure it's cleared before each main function call or created locally within the public method.

By being mindful of these common issues, you can write more robust and correct backtracking solutions. Always test thoroughly with edge cases!
```