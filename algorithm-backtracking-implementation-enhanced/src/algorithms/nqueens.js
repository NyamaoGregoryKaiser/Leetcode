```javascript
/**
 * @fileoverview
 * Implementation for the N-Queens problem using backtracking.
 *
 * Problem: The N-Queens puzzle is the problem of placing N non-attacking queens on
 * an N x N chessboard. Return all distinct solutions to the N-Queens puzzle.
 * Each solution contains a distinct board configuration of the N-Queens' placement,
 * where 'Q' and '.' both indicate a queen and an empty space, respectively.
 *
 * Example (N = 4):
 * Output:
 * [
 *  [".Q..","...Q","Q...","..Q."],
 *  ["..Q.","Q...","...Q",".Q.."]
 * ]
 *
 * Constraints:
 * - 1 <= n <= 9
 */

/**
 * Solves the N-Queens problem by finding all distinct solutions.
 * Uses a backtracking approach to place queens row by row.
 *
 * @param {number} n The size of the chessboard (n x n).
 * @returns {string[][]} An array of all distinct board configurations.
 *                        Each configuration is an array of strings, where 'Q'
 *                        represents a queen and '.' represents an empty square.
 */
function solveNQueens(n) {
    const results = [];
    const board = Array(n).fill(0).map(() => Array(n).fill('.'));

    // To optimize checking for attacks, we use sets to keep track of
    // occupied columns, and diagonals.
    // A queen at (row, col) attacks:
    // 1. Same row: handled by placing one queen per row.
    // 2. Same column: check `cols.has(col)`.
    // 3. Same primary diagonal (top-left to bottom-right): row - col is constant. `diag1.has(row - col)`.
    // 4. Same secondary diagonal (top-right to bottom-left): row + col is constant. `diag2.has(row + col)`.
    const cols = new Set();
    const diag1 = new Set(); // row - col
    const diag2 = new Set(); // row + col

    /**
     * Recursive backtracking function to place queens.
     * @param {number} row The current row where we are trying to place a queen.
     */
    function backtrack(row) {
        // Base case: If we have successfully placed queens in all `n` rows,
        // we have found a valid solution.
        if (row === n) {
            // Convert the current board state (2D array of chars) to the required
            // array of strings format and add to results.
            results.push(board.map(r => r.join('')));
            return;
        }

        // Recursive step: Try to place a queen in each column of the current `row`.
        for (let col = 0; col < n; col++) {
            // Check if placing a queen at (row, col) is safe (i.e., not attacked).
            // Pruning: If any of these conditions are true, this column is not valid.
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue; // Move to the next column
            }

            // Make a choice: Place a queen at (row, col).
            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);

            // Explore: Recurse to place a queen in the next row.
            backtrack(row + 1);

            // Unmake the choice (backtrack): Remove the queen from (row, col)
            // and clear the markers. This allows other placement options for the current row.
            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }

    backtrack(0); // Start placing queens from the first row (row 0).
    return results;
}

/*
 * Time Complexity Analysis:
 * Let N be the size of the board.
 *
 * The N-Queens problem is a classic example where the complexity is difficult
 * to express with a simple polynomial or exponential function.
 *
 * Upper bound (Worst Case - without pruning):
 * - Without any pruning, we would explore N^N possibilities (N choices for each of N rows).
 *
 * With backtracking and pruning:
 * - The actual number of states visited is significantly reduced.
 * - At each row `r`, we iterate `N` columns.
 * - Inside the loop, checking sets (`has`, `add`, `delete`) takes O(1) on average.
 * - The depth of the recursion is N.
 * - The number of valid placements at each level `r` is `N-r` on average if we consider available positions.
 *
 * A tighter approximation involves considering the number of valid partial solutions.
 * The complexity is roughly factorial, but better than N^N. It's closer to O(N!)
 * because we are essentially choosing a unique column for each queen (like permutations),
 * with additional pruning for diagonal attacks.
 *
 * For N up to 10, it's very fast. For N=15, it's already quite slow.
 * The number of solutions grows quite fast but not as fast as N!.
 * Empirically, for N up to ~15-16, this approach is efficient enough.
 *
 * If we count the total number of operations, it's bounded by O(N! * N) or O(N^N).
 * A more precise estimate is `O(solutions * N^2)` or `O(N!)`.
 * For N-Queens specifically, the time complexity is often stated as being
 * between O(N!) and O(N^N), or more practically, related to the number of nodes in the search tree.
 * The total number of solutions S(N) can be large.
 * Each solution found requires O(N) to build the string array.
 * So, `O(S(N) * N)` might be a more practical view for final output generation.
 * The search process itself is more complex, but `O(N!)` is a common loose upper bound for many
 * permutation-like backtracking problems with significant pruning.
 *
 * Space Complexity Analysis:
 *
 * 1. `results` array: Stores `S(N)` solutions (where S(N) is the number of solutions).
 *    Each solution is an N x N board (array of N strings, each N chars).
 *    So, O(S(N) * N^2) space.
 * 2. `board` array: N x N characters. O(N^2) space.
 * 3. `cols`, `diag1`, `diag2` sets:
 *    - `cols`: Stores up to N column indices. O(N) space.
 *    - `diag1`: Stores up to N unique `row - col` values. Range is `-(N-1)` to `(N-1)`. O(N) space.
 *    - `diag2`: Stores up to N unique `row + col` values. Range is `0` to `2*(N-1)`. O(N) space.
 * 4. Recursion call stack: The depth of the recursion is N (one call per row). O(N) space.
 *
 * Total Space Complexity: O(S(N) * N^2) (dominated by storing all solutions).
 * If we only care about auxiliary space (excluding output), it's O(N^2) for the board
 * and O(N) for sets and recursion stack.
 */

module.exports = {
    solveNQueens
};
```